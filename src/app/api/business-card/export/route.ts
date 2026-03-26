/**
 * API Route: /api/business-card/export
 *
 * GET /api/business-card/export?name=...&role=...&side=front|back|both
 *
 * Retorna:
 *   side=front  → PDF (application/pdf)
 *   side=back   → PDF (application/pdf)
 *   side=both   → ZIP com os dois PDFs (application/zip)
 *
 * Coloque este arquivo em:
 *   app/api/business-card/export/route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import puppeteer, { Browser, Page } from 'puppeteer';
import JSZip from 'jszip';

/* ── Dimensões ──────────────────────────────────────────────────── */
const PDF_W = '91mm';
const PDF_H = '60mm';
const VP_W = 344;   // 91mm @ 96dpi
const VP_H = 227;   // 60mm @ 96dpi

/* ── Lógica de isolamento — idêntica ao script .mjs que funciona ── */
async function isolateCard(page: Page, side: 'front' | 'back') {
    await page.evaluate((s: string) => {

        // 1. LIMPEZA TOTAL DE UI E ARTEFATOS DO NEXT.JS
        document.querySelectorAll<HTMLElement>(
            'a[aria-label="Chat on WhatsApp"], a[href*="wa.me"], [class*="animate-ping"], ' +
            '.no-print, [role="dialog"], .hint, ' +
            'nextjs-portal, #__next-build-watcher, [data-nextjs-toast]'
        ).forEach(el => (el.closest('a') ?? el).remove());

        const front = document.querySelector<HTMLElement>('.card-front');
        const back = document.querySelector<HTMLElement>('.card-back');
        if (!front || !back) throw new Error('.card-front / .card-back não encontrados');

        // 2. Oculta o lado não impresso
        if (s === 'front') back.style.setProperty('display', 'none', 'important');
        else front.style.setProperty('display', 'none', 'important');

        document.querySelectorAll<HTMLElement>('p').forEach(el => {
            if (!el.closest('.card')) el.remove();
        });

        // 3. MATEMÁTICA ABSOLUTA DO PDF (91×60mm)
        const bgColor = s === 'front' ? '#f7f9f7' : '#ffffff';

        const docStyles = document.documentElement.style;
        const bodyStyles = document.body.style;

        docStyles.setProperty('background', bgColor, 'important');
        docStyles.setProperty('margin', '0', 'important');
        docStyles.setProperty('padding', '0', 'important');
        docStyles.setProperty('width', '91mm', 'important');
        docStyles.setProperty('height', '60mm', 'important');
        docStyles.setProperty('overflow', 'hidden', 'important');

        bodyStyles.setProperty('margin', '0', 'important');
        bodyStyles.setProperty('padding', '3mm', 'important');
        bodyStyles.setProperty('width', '91mm', 'important');
        bodyStyles.setProperty('height', '60mm', 'important');
        bodyStyles.setProperty('box-sizing', 'border-box', 'important');
        bodyStyles.setProperty('display', 'block', 'important');
        bodyStyles.setProperty('background', bgColor, 'important');
        bodyStyles.setProperty('overflow', 'hidden', 'important');

        // 4. CONFIGURAÇÃO DO CARD (85×54mm no centro da sangria)
        const vc = s === 'front' ? front : back;
        vc.style.setProperty('box-shadow', 'none', 'important');
        vc.style.setProperty('border-radius', '0', 'important');
        vc.style.setProperty('margin', '0', 'important');
        vc.style.setProperty('width', '85mm', 'important');
        vc.style.setProperty('height', '54mm', 'important');
        vc.style.setProperty('overflow', 'visible', 'important');
        vc.style.setProperty('position', 'relative', 'important');

        if (s === 'front') {
            vc.style.setProperty('display', 'flex', 'important');
            vc.style.setProperty('flex-direction', 'column', 'important');
            vc.style.setProperty('justify-content', 'space-between', 'important');
        } else {
            vc.style.setProperty('display', 'flex', 'important');
            vc.style.setProperty('align-items', 'stretch', 'important');
        }

        // 5. ZERA ANCESTRAIS
        let el = vc.parentElement;
        while (el && el !== document.body && el !== document.documentElement) {
            el.style.setProperty('display', 'block', 'important');
            el.style.setProperty('padding', '0', 'important');
            el.style.setProperty('margin', '0', 'important');
            el.style.setProperty('width', '100%', 'important');
            el.style.setProperty('height', '100%', 'important');
            el.style.setProperty('border', 'none', 'important');
            el = el.parentElement;
        }

        // 6. AJUSTE CIRÚRGICO DA SANGRIA
        if (s === 'front') {
            const frontLine = vc.querySelector<HTMLElement>('.front-accent-line');
            if (frontLine) {
                frontLine.style.setProperty('height', '60mm', 'important');
                frontLine.style.setProperty('top', '50%', 'important');
                frontLine.style.setProperty('transform', 'translateY(-50%)', 'important');
            }
        } else {
            const backCol = vc.querySelector<HTMLElement>('.back-col');
            if (backCol) {
                backCol.style.setProperty('height', '60mm', 'important');
                backCol.style.setProperty('align-self', 'center', 'important');
                backCol.style.setProperty('margin-top', '0', 'important');
                backCol.style.setProperty('margin-bottom', '0', 'important');
            }
        }

    }, side);
}

/* ── Gera um PDF para um lado do cartão ────────────────────────── */
async function generatePDF(
    browser: Browser,
    url: string,
    side: 'front' | 'back'
): Promise<Buffer> {
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: VP_W, height: VP_H, deviceScaleFactor: 3 });
        await page.emulateMediaType('screen');

        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });
        await page.waitForSelector(`.card-${side}`, { timeout: 10_000 });
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 1000));

        await isolateCard(page, side);
        await new Promise(r => setTimeout(r, 400));

        const pdf = await page.pdf({
            width: PDF_W,
            height: PDF_H,
            printBackground: true,
            pageRanges: '1',
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
        });

        return Buffer.from(pdf);
    } finally {
        await page.close();
    }
}

/* ── Handler da rota ────────────────────────────────────────────── */
export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const cardParams = new URLSearchParams();
    ['name', 'role', 'email', 'whatsapp', 'site', 'address'].forEach(k => {
        const v = searchParams.get(k);
        if (v) cardParams.set(k, v);
    });

    const side = (searchParams.get('side') ?? 'both') as 'front' | 'back' | 'both';

    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    const cardUrl = `${baseUrl}/en/business-card${cardParams.toString() ? '?' + cardParams : ''}`;

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
    });

    try {
        if (side === 'front' || side === 'back') {
            const pdf = await generatePDF(browser, cardUrl, side);
            const name = searchParams.get('name')?.replace(/\s+/g, '-') ?? 'business-card';

            return new NextResponse(pdf, {
                status: 200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="${name}-${side}.pdf"`,
                    'Content-Length': pdf.length.toString(),
                },
            });
        }

        /* ZIP com frente + verso em paralelo */
        const [frontPdf, backPdf] = await Promise.all([
            generatePDF(browser, cardUrl, 'front'),
            generatePDF(browser, cardUrl, 'back'),
        ]);

        const name = searchParams.get('name')?.replace(/\s+/g, '-') ?? 'business-card';
        const zip = new JSZip();
        zip.file(`${name}-front.pdf`, frontPdf);
        zip.file(`${name}-back.pdf`, backPdf);
        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

        return new NextResponse(zipBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${name}-card.zip"`,
                'Content-Length': zipBuffer.length.toString(),
            },
        });

    } catch (err) {
        console.error('[business-card/export]', err);
        return NextResponse.json(
            { error: 'Falha ao gerar o PDF. Verifique os logs do servidor.' },
            { status: 500 }
        );
    } finally {
        await browser.close();
    }
}