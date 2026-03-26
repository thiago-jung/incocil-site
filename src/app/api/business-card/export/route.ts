/**
 * API Route: /api/business-card/export
 * Coloque em: app/api/business-card/export/route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import puppeteer, { Browser, Page } from 'puppeteer';
import JSZip from 'jszip';

const PDF_W = '91mm';
const PDF_H = '60mm';
const VP_W = 344;
const VP_H = 227;

async function isolateCard(page: Page, side: 'front' | 'back') {
    await page.evaluate((s: string) => {
        document.querySelectorAll<HTMLElement>(
            'a[aria-label="Chat on WhatsApp"], a[href*="wa.me"], [class*="animate-ping"], ' +
            '.no-print, [role="dialog"], .hint, ' +
            'nextjs-portal, #__next-build-watcher, [data-nextjs-toast]'
        ).forEach(el => (el.closest('a') ?? el).remove());

        const front = document.querySelector<HTMLElement>('.card-front');
        const back = document.querySelector<HTMLElement>('.card-back');
        if (!front || !back) throw new Error('.card-front / .card-back não encontrados');

        if (s === 'front') back.style.setProperty('display', 'none', 'important');
        else front.style.setProperty('display', 'none', 'important');

        document.querySelectorAll<HTMLElement>('p').forEach(el => {
            if (!el.closest('.card')) el.remove();
        });

        const bgColor = s === 'front' ? '#f7f9f7' : '#ffffff';
        const doc = document.documentElement.style;
        const body = document.body.style;

        doc.setProperty('background', bgColor, 'important');
        doc.setProperty('margin', '0', 'important');
        doc.setProperty('padding', '0', 'important');
        doc.setProperty('width', '91mm', 'important');
        doc.setProperty('height', '60mm', 'important');
        doc.setProperty('overflow', 'hidden', 'important');

        body.setProperty('margin', '0', 'important');
        body.setProperty('padding', '3mm', 'important');
        body.setProperty('width', '91mm', 'important');
        body.setProperty('height', '60mm', 'important');
        body.setProperty('box-sizing', 'border-box', 'important');
        body.setProperty('display', 'block', 'important');
        body.setProperty('background', bgColor, 'important');
        body.setProperty('overflow', 'hidden', 'important');

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

        if (s === 'front') {
            const line = vc.querySelector<HTMLElement>('.front-accent-line');
            if (line) {
                line.style.setProperty('height', '60mm', 'important');
                line.style.setProperty('top', '50%', 'important');
                line.style.setProperty('transform', 'translateY(-50%)', 'important');
            }
        } else {
            const col = vc.querySelector<HTMLElement>('.back-col');
            if (col) {
                col.style.setProperty('height', '60mm', 'important');
                col.style.setProperty('align-self', 'center', 'important');
                col.style.setProperty('margin-top', '0', 'important');
                col.style.setProperty('margin-bottom', '0', 'important');
            }
        }
    }, side);
}

async function generatePDF(browser: Browser, url: string, side: 'front' | 'back'): Promise<ArrayBuffer> {
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
            width: PDF_W, height: PDF_H,
            printBackground: true, pageRanges: '1',
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
        });
        // Extrai o ArrayBuffer subjacente — aceito como BodyInit em qualquer versão do TS
        return pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength) as ArrayBuffer;
    } finally {
        await page.close();
    }
}

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
    const name = searchParams.get('name')?.replace(/\s+/g, '-') ?? 'business-card';

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
    });

    try {
        if (side === 'front' || side === 'back') {
            const pdf = await generatePDF(browser, cardUrl, side);
            return new Response(pdf, {
                status: 200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="${name}-${side}.pdf"`,
                    'Content-Length': pdf.byteLength.toString(),
                },
            });
        }

        const [frontPdf, backPdf] = await Promise.all([
            generatePDF(browser, cardUrl, 'front'),
            generatePDF(browser, cardUrl, 'back'),
        ]);

        const zip = new JSZip();
        zip.file(`${name}-front.pdf`, frontPdf);
        zip.file(`${name}-back.pdf`, backPdf);
        const zipBuf = await zip.generateAsync({ type: 'arraybuffer', compression: 'DEFLATE' });

        return new Response(zipBuf, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${name}-card.zip"`,
                'Content-Length': zipBuf.byteLength.toString(),
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