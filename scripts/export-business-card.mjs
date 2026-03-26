/**
 * INCOCIL® Business Card — Exportador PDF
 * Saída: card-front.pdf + card-back.pdf (91×60mm = 85×54mm + 3mm sangria)
 *
 * Uso:
 *   node export-business-card.mjs
 *   node export-business-card.mjs --name="João Silva" --role="Engenheiro"
 */

import puppeteer from 'puppeteer';

const args = Object.fromEntries(
    process.argv.slice(2)
        .filter(a => a.startsWith('--'))
        .map(a => { const [k, ...v] = a.slice(2).split('='); return [k, v.join('=')]; })
);

const BASE_URL = args.url ?? (() => {
    const qs = new URLSearchParams();
    ['name','role','email','whatsapp','site','address'].forEach(k => args[k] && qs.set(k, args[k]));
    const q = qs.toString();
    return `http://localhost:3000/en/business-card${q ? '?' + q : ''}`;
})();

const PDF_W = '91mm', PDF_H = '60mm';
const VP_W = 344, VP_H = 227; // 91×60mm @ 96dpi


async function isolateCard(page, side) {
    await page.evaluate((s) => {
        // 1. LIMPEZA TOTAL DE UI E ARTEFATOS DO NEXT.JS
        document.querySelectorAll(
            'a[aria-label="Chat on WhatsApp"], a[href*="wa.me"], [class*="animate-ping"], ' +
            '.no-print, [role="dialog"], .hint, ' +
            'nextjs-portal, #__next-build-watcher, [data-nextjs-toast]' // <== Remove logo/toasts do Next.js
        ).forEach(el => el.closest('a') ? el.closest('a').remove() : el.remove());

        const front = document.querySelector('.card-front');
        const back = document.querySelector('.card-back');
        if (!front || !back) throw new Error('.card-front / .card-back não encontrados');

        // 2. Oculta o lado não impresso
        if (s === 'front') { back.style.setProperty('display', 'none', 'important'); }
        else { front.style.setProperty('display', 'none', 'important'); }

        document.querySelectorAll('p').forEach(el => { if (!el.closest('.card')) el.remove(); });

        // 3. MATEMÁTICA ABSOLUTA DO PDF (91x60mm)
        const bgColor = s === 'front' ? '#f7f9f7' : '#ffffff';
        const docStyles = document.documentElement.style;
        const bodyStyles = document.body.style;

        // HTML e Body blindados contra scrollbars e frestas brancas
        docStyles.setProperty('background', bgColor, 'important');
        docStyles.setProperty('margin', '0', 'important');
        docStyles.setProperty('padding', '0', 'important');
        docStyles.setProperty('width', '91mm', 'important');
        docStyles.setProperty('height', '60mm', 'important');
        docStyles.setProperty('overflow', 'hidden', 'important');

        bodyStyles.setProperty('margin', '0', 'important');
        bodyStyles.setProperty('padding', '3mm', 'important'); // 3mm de margem = empurra o card pro centro
        bodyStyles.setProperty('width', '91mm', 'important');
        bodyStyles.setProperty('height', '60mm', 'important');
        bodyStyles.setProperty('box-sizing', 'border-box', 'important');
        bodyStyles.setProperty('display', 'block', 'important');
        bodyStyles.setProperty('background', bgColor, 'important');
        bodyStyles.setProperty('overflow', 'hidden', 'important');

        // 4. CONFIGURAÇÃO DO CARD (85x54mm no centro da sangria)
        const vc = s === 'front' ? front : back;
        vc.style.setProperty('box-shadow', 'none', 'important');
        vc.style.setProperty('border-radius', '0', 'important');
        vc.style.setProperty('margin', '0', 'important');
        vc.style.setProperty('width', '85mm', 'important');
        vc.style.setProperty('height', '54mm', 'important');
        vc.style.setProperty('overflow', 'visible', 'important'); // Deixa vazar a sangria
        vc.style.setProperty('position', 'relative', 'important');

        // Restaura flexbox original
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

        // 6. AJUSTE CIRÚRGICO DA SANGRIA (A SOLUÇÃO DO ESPAÇO EM BRANCO)
        // Ao forçar 60mm e centralizar verticalmente, garantimos matematicamente
        // que as faixas vazarão exatamente 3mm para cima e 3mm para baixo da div pai (que tem 54mm).
        if (s === 'front') {
            const frontLine = vc.querySelector('.front-accent-line');
            if (frontLine) {
                frontLine.style.setProperty('height', '60mm', 'important');
                frontLine.style.setProperty('top', '50%', 'important');
                frontLine.style.setProperty('transform', 'translateY(-50%)', 'important');
            }
        } else {
            const backCol = vc.querySelector('.back-col');
            if (backCol) {
                backCol.style.setProperty('height', '60mm', 'important');
                // "align-self: center" quebra a trava do pai e permite o elemento ser maior que o cartão
                backCol.style.setProperty('align-self', 'center', 'important');
                backCol.style.setProperty('margin-top', '0', 'important');
                backCol.style.setProperty('margin-bottom', '0', 'important');
            }
        }
    }, side);
}

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox','--font-render-hinting=none'] });
try {
    const page = await browser.newPage();
    await page.setViewport({ width: VP_W, height: VP_H, deviceScaleFactor: 3 });
    await page.setRequestInterception(true);
    page.on('request', req => ['analytics','hotjar','facebook'].some(b => req.url().includes(b)) ? req.abort() : req.continue());
    await page.emulateMediaType('screen');
    console.log(`\n📄 INCOCIL® Card Exporter\n🌐 ${BASE_URL}\n`);

    for (const side of ['front', 'back']) {
        console.log(`⚙️  Exportando ${side}...`);
        await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30_000 });
        await page.waitForSelector(`.card-${side}`, { timeout: 10_000 });
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 1000));
        await isolateCard(page, side);
        await new Promise(r => setTimeout(r, 400));
        await page.pdf({ path: `card-${side}-buss.pdf`, width: PDF_W, height: PDF_H, printBackground: true, pageRanges: '1', margin: { top:0, right:0, bottom:0, left:0 } });
        console.log(`✅  card-${side}-buss.pdf salvo`);
    }

    console.log(`\n🎉 Concluído! card-front-buss.pdf + card-back-buss.pdf (${PDF_W}×${PDF_H})\n`);
} finally {
    await browser.close();
}
