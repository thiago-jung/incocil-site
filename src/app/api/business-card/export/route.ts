/**
 * API Route: /api/business-card/export
 * Full-bleed: card 91×60mm = tamanho exato do PDF, sem padding no body.
 */

import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import type { Browser } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';


const PDF_W = '91mm';
const PDF_H = '60mm';
const VP_W = 344; // 91mm @ 96dpi
const VP_H = 227; // 60mm @ 96dpi

type Person = {
    name: string; role: string; email: string;
    whatsapp: string; site: string; address: string;
};

/* ─── SVGs inline ─── */
const svgWhatsApp = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" stroke="#16a34a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <g transform="translate(5.4, 5.4) scale(0.55)">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 11.5 19.79 19.79 0 0 1 .84 3.04 2 2 0 0 1 2.82.84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 8.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#16a34a" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;
const svgMail = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#16a34a" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M22 7 12 13 2 7" stroke="#16a34a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
const svgGlobe = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" stroke="#16a34a" stroke-width="1.6"/>
  <path d="M2 12h20" stroke="#16a34a" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" stroke="#16a34a" stroke-width="1.6"/>
</svg>`;
const svgPin = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#16a34a" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="12" cy="9" r="2.5" stroke="#16a34a" stroke-width="1.6"/>
</svg>`;

function escapeHtml(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildHTML(person: Person, side: 'front' | 'back'): string {
    const isFront = side === 'front';
    const isBack = side === 'back';

    const logoSvg = fs.readFileSync(
        path.join(process.cwd(), 'public/images/incocil_verde.svg'),
        'utf-8'
    );

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700;800&family=Barlow+Condensed:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

  /* ─ Full bleed: body = página ─ */
  html, body {
    width: 91mm; height: 60mm;
    overflow: hidden;
    margin: 0; padding: 0;
    background: ${isFront ? '#f7f9f7' : '#ffffff'};
  }

  /* ─ Card ocupa 100% da página ─ */
  .card {
    width: 91mm; height: 60mm;
    position: relative; overflow: hidden;
  }

  /* ══════════════ FRENTE ══════════════ */
  .card-front {
    background: #f7f9f7;
    display: ${isFront ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: space-between;
    /* padding original (5.5/6/5.2/7mm) + 3mm de bleed em cada lado */
    padding: 8.5mm 9mm 8.2mm 10mm;
  }

  /* Linha lateral — sangra topo e baixo */
  .front-accent-line {
    position: absolute;
    left: 0; top: 0;
    width: 1.4mm; height: 100%;
    background: linear-gradient(180deg,
      #4ade80 0%, #16a34a 35%, #15803d 70%, #14532d 100%);
    z-index: 2;
  }

  .front-logo { position: relative; z-index: 3; }

  .front-bottom {
    position: relative; z-index: 3;
    display: flex; flex-direction: column;
  }

  .front-rule {
    width: 7mm; height: 0.35mm;
    background: linear-gradient(90deg, #16a34a 0%, rgba(22,163,74,0) 100%);
    margin-bottom: 2mm;
  }

  .front-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10.5pt; font-weight: 800;
    color: #0f172a; letter-spacing: -0.025em; line-height: 1.1;
  }

  .front-role {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 5.8pt; font-weight: 700;
    color: #16a34a; letter-spacing: 0.22em;
    text-transform: uppercase; margin-top: 1.2mm;
  }

  /* Listras — posicionadas no canto exato da página */
  .stripe-tl {
    position: absolute; top: 0; left: 0;
    width: 28mm; height: 28mm;
    z-index: 1; pointer-events: none;
  }
  .stripe-br {
    position: absolute; bottom: 0; right: 0;
    width: 24mm; height: 24mm;
    z-index: 1; pointer-events: none;
  }

  .cylinder-bg {
    position: absolute; left: 11mm; top: 50%;
    transform: translateY(-50%);
    width: 45mm; opacity: 0.25;
    z-index: 1; mix-blend-mode: multiply;
  }

  /* ══════════════ VERSO ══════════════ */
  .card-back {
    background: #ffffff;
    display: ${isBack ? 'flex' : 'none'};
    align-items: stretch;
    width: 91mm; height: 60mm;
  }

  /* Coluna verde — sangra nas 3 bordas (esq, topo, baixo) */
  .back-col {
    /* 14.5mm (original) + 3mm de bleed esquerdo = 17.5mm */
    width: 17.5mm;
    height: 60mm;         /* altura total da página */
    /* padding interno: compensa os 3mm de bleed no topo/baixo */
    padding-top: 7.5mm;   /* 4.5 + 3 */
    padding-bottom: 7.5mm;
    background: linear-gradient(160deg, #22c55e 0%, #15803d 30%, #0f4d25 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: space-between;
    flex-shrink: 0;
    position: relative; z-index: 2; overflow: hidden;
  }

  .back-col::after {
    content: '';
    position: absolute; right: 0; top: 0;
    width: 0.4mm; height: 100%;
    background: linear-gradient(180deg,
      transparent 0%, rgba(255,255,255,0.18) 40%,
      rgba(255,255,255,0.10) 70%, transparent 100%);
  }
  .back-col::before {
    content: ''; position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -45deg, transparent, transparent 3px,
      rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px);
  }

  .back-col-ornament { width: 4mm; height: 0.3mm; background: rgba(255,255,255,0.4); }

  .back-col-name {
    writing-mode: vertical-rl; transform: rotate(180deg);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 4.8pt; font-weight: 800;
    color: rgba(255,255,255,0.88);
    letter-spacing: 0.32em; text-transform: uppercase;
    position: relative; z-index: 1;
  }

  /* Área de conteúdo — padding aumentado pelo bleed */
  .back-content {
    flex: 1; display: flex; flex-direction: column;
    justify-content: center; gap: 2.2mm;
    /* original: 4/4.5/4/3.8mm + 3mm bleed */
    padding: 7mm 7.5mm 7mm 4.8mm;
    position: relative; z-index: 2;
  }

  .contact-row { display: flex; align-items: center; gap: 2.4mm; }

  .contact-icon {
    width: 3.8mm; height: 3.8mm;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  .contact-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 5.4pt; font-weight: 400; color: #475569; line-height: 1.2;
  }
  .contact-text.highlight { font-size: 6.2pt; font-weight: 700; color: #0f172a; letter-spacing: 0.01em; }
  .contact-text.site      { font-size: 7.2pt; font-weight: 700; color: #16a34a; letter-spacing: 0.04em; }
  .contact-text.small     { font-size: 4.6pt; color: #94a3b8; line-height: 1.35; }

  .back-divider {
    width: 100%; height: 0.15mm;
    background: linear-gradient(90deg, #e2e8f0 0%, rgba(226,232,240,0) 100%);
    margin: 0.6mm 0;
  }

  /* Listras verso — canto superior direito */
  .back-stripe-tr {
    position: absolute; top: 0; right: 0;
    width: 24mm; height: 24mm;
    z-index: 1; pointer-events: none;
  }
</style>
</head>
<body>

<!-- ══ FRENTE ══ -->
<div class="card card-front">
  <div class="front-accent-line"></div>

  <svg class="stripe-tl" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="-2,0 0,-2 22,-2 -2,22"  fill="#0f172a" opacity="0.7"/>
    <polygon points="-2,24 24,-2 40,-2 -2,40" fill="#14532d" opacity="0.9"/>
    <polygon points="-2,42 42,-2 58,-2 -2,58" fill="#16a34a" opacity="0.75"/>
    <polygon points="-2,60 60,-2 65,-2 -2,65" fill="#0f172a" opacity="0.55"/>
    <polygon points="-2,68 68,-2 80,-2 -2,80" fill="#15803d" opacity="0.45"/>
    <polygon points="-2,83 83,-2 90,-2 -2,90" fill="#4ade80" opacity="0.20"/>
  </svg>

  <svg class="stripe-br" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="97,73 73,97 97,97"          fill="#0f172a" opacity="0.7"/>
    <polygon points="97,55 55,97 72,97 97,72"    fill="#14532d" opacity="0.9"/>
    <polygon points="97,37 37,97 53,97 97,53"    fill="#16a34a" opacity="0.75"/>
    <polygon points="97,32 32,97 37,97 97,37"    fill="#0f172a" opacity="0.55"/>
    <polygon points="97,18 18,97 30,97 97,30"    fill="#15803d" opacity="0.45"/>
    <polygon points="97,8  8,97  16,97 97,16"    fill="#4ade80" opacity="0.20"/>
  </svg>

  <svg class="cylinder-bg" viewBox="-10 0 490 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="h1" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke="#166534" stroke-width="1.2"/>
      </pattern>
    </defs>
    <line x1="-10" y1="95" x2="460" y2="95" stroke="#166534" stroke-width="0.7" stroke-dasharray="10,4,2,4"/>
    <circle cx="38" cy="95" r="28" fill="url(#h1)" stroke="#166534" stroke-width="1.6"/>
    <circle cx="38" cy="95" r="14" fill="#f1f5f0" stroke="#166534" stroke-width="1.4"/>
    <path d="M80,62 Q66,62 66,95 Q66,128 80,128 L80,62 Z" fill="url(#h1)" stroke="#166534" stroke-width="1.4"/>
    <rect x="80" y="62" width="280" height="66" fill="url(#h1)" stroke="#166534" stroke-width="1.5"/>
    <path d="M360,62 Q380,62 380,95 Q380,128 360,128 L360,62 Z" fill="url(#h1)" stroke="#166534" stroke-width="1.4"/>
    <rect x="88" y="41" width="12" height="21" rx="1" fill="url(#h1)" stroke="#166534" stroke-width="1.3"/>
    <rect x="308" y="41" width="12" height="21" rx="1" fill="url(#h1)" stroke="#166534" stroke-width="1.3"/>
    <rect x="80" y="62" width="38" height="66" rx="1" fill="url(#h1)" stroke="#166534" stroke-width="1.8"/>
    <line x1="155" y1="82" x2="173" y2="82" stroke="#166534" stroke-width="1.2" stroke-dasharray="2,2"/>
    <line x1="155" y1="108" x2="173" y2="108" stroke="#166534" stroke-width="1.2" stroke-dasharray="2,2"/>
    <rect x="335" y="62" width="24" height="66" rx="1" fill="url(#h1)" stroke="#166534" stroke-width="1.8"/>
    <line x1="350" y1="88" x2="364" y2="88" stroke="#166534" stroke-width="1.2" stroke-dasharray="2,2"/>
    <line x1="350" y1="100" x2="364" y2="100" stroke="#166534" stroke-width="1.2" stroke-dasharray="2,2"/>
    <rect x="80" y="86" width="340" height="18" rx="1" fill="url(#h1)" stroke="#166534" stroke-width="1.4"/>
    <circle cx="442" cy="95" r="22" fill="url(#h1)" stroke="#166534" stroke-width="1.5"/>
    <circle cx="442" cy="95" r="11" fill="#f1f5f0" stroke="#166534" stroke-width="1.3"/>
  </svg>

    <div class="front-logo" style="height:12mm;max-width:48mm;display:flex;align-items:center;">
    ${logoSvg}
  </div>

  <div class="front-bottom">
    <div class="front-rule"></div>
    <p class="front-name">${escapeHtml(person.name)}</p>
    <p class="front-role">${escapeHtml(person.role)}</p>
  </div>
</div>

<!-- ══ VERSO ══ -->
<div class="card card-back">
  <svg class="back-stripe-tr" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="85" y1="10" x2="10" y2="85" stroke="#16a34a" stroke-width="3.5" stroke-linecap="square" opacity="0.14"/>
    <line x1="85" y1="26" x2="26" y2="85" stroke="#16a34a" stroke-width="3.5" stroke-linecap="square" opacity="0.09"/>
    <line x1="85" y1="42" x2="42" y2="85" stroke="#0f172a" stroke-width="2.5" stroke-linecap="square" opacity="0.05"/>
  </svg>

  <div class="back-col">
    <div class="back-col-ornament"></div>
    <span class="back-col-name">INCOCIL®</span>
    <div class="back-col-ornament"></div>
  </div>

  <div class="back-content">
    <div class="contact-row">
      <div class="contact-icon">${svgWhatsApp}</div>
      <span class="contact-text highlight">${escapeHtml(person.whatsapp)}</span>
    </div>
    <div class="contact-row">
      <div class="contact-icon">${svgMail}</div>
      <span class="contact-text">${escapeHtml(person.email)}</span>
    </div>
    <div class="back-divider"></div>
    <div class="contact-row">
      <div class="contact-icon">${svgGlobe}</div>
      <span class="contact-text site">${escapeHtml(person.site)}</span>
    </div>
    <div class="contact-row">
      <div class="contact-icon">${svgPin}</div>
      <span class="contact-text small">${escapeHtml(person.address)}</span>
    </div>
  </div>
</div>

</body>
</html>`;
}

async function generatePDF(browser: Browser, html: string, side: 'front' | 'back'): Promise<ArrayBuffer> {
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: VP_W, height: VP_H, deviceScaleFactor: 2 });
        await page.emulateMediaType('screen');

        await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30_000 });
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 1_000));

        const pdf = await page.pdf({
            width: PDF_W,
            height: PDF_H,
            printBackground: true,
            pageRanges: '1',
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
        });

        return pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength) as ArrayBuffer;
    } finally {
        await page.close();
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const person: Person = {
        name: searchParams.get('name') ?? 'Marcus Roberto Jung',
        role: searchParams.get('role') ?? 'CEO',
        email: searchParams.get('email') ?? 'marcus.jung@incocil.com.br',
        whatsapp: searchParams.get('whatsapp') ?? '+55 51 98446-8241',
        site: searchParams.get('site') ?? 'www.incocil.com',
        address: searchParams.get('address') ?? 'Av. Ricardo Leônidas Ribas, 310 — Porto Alegre, RS. Brazil',
    };

    const side = (searchParams.get('side') ?? 'both') as 'front' | 'back' | 'both';
    const slug = person.name.replace(/\s+/g, '-');

    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
    });

    try {
        if (side === 'front' || side === 'back') {
            const pdf = await generatePDF(browser, buildHTML(person, side), side);
            return new Response(pdf, {
                status: 200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="${slug}-${side}.pdf"`,
                    'Content-Length': pdf.byteLength.toString(),
                },
            });
        }

        const [frontPdf, backPdf] = await Promise.all([
            generatePDF(browser, buildHTML(person, 'front'), 'front'),
            generatePDF(browser, buildHTML(person, 'back'), 'back'),
        ]);

        const zip = new JSZip();
        zip.file(`${slug}-front.pdf`, frontPdf);
        zip.file(`${slug}-back.pdf`, backPdf);
        const zipBuf = await zip.generateAsync({ type: 'arraybuffer', compression: 'DEFLATE' });

        return new Response(zipBuf, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${slug}-card.zip"`,
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