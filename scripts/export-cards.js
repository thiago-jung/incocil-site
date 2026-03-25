import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 3 });
await page.goto('http://localhost:3000/en/hannover-messe-2026/card', { waitUntil: 'networkidle0' });

await new Promise(r => setTimeout(r, 2500));

const prepareBody = async () => {
    await page.evaluate(() => {
        document.querySelectorAll('[role="dialog"], .label, .no-print').forEach(el => el.remove());
        // padding: 0 — a sangria já está dentro do card
        document.body.style.cssText = 'margin:0;padding:0;min-height:unset;display:block;background:#0F172A;box-sizing:border-box;';
        document.querySelector('.cards-wrapper').style.cssText = 'display:block;padding:0;margin:0;';
    });
};

// ── Frente ──
await prepareBody();
await page.evaluate(() => {
    document.querySelector('.card-front').style.display = '';
    document.querySelector('.card-back').style.display = 'none';
});
// 85 + 3mm sangria cada lado = 91mm | 54 + 3mm cada lado = 60mm
await page.pdf({ path: 'card-front.pdf', width: '95mm', height: '65mm', printBackground: true });

// ── Verso ──
await prepareBody();
await page.evaluate(() => {
    document.querySelector('.card-front').style.display = 'none';
    document.querySelector('.card-back').style.display = '';
});
await page.pdf({ path: 'card-back.pdf', width: '95mm', height: '65mm', printBackground: true });

await browser.close();