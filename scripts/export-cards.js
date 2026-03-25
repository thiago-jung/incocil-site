import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 3 });
await page.goto('http://localhost:3000/en/hannover-messe-2026/card');

// ── Frente ──
await page.evaluate(() => {
    document.querySelector('.card-back').style.display = 'none';
    document.querySelector('.label').style.display = 'none'; // esconde labels "Front" / "Back"
});
await page.pdf({
    path: 'card-front.pdf',
    width: '85mm',
    height: '55mm',
    printBackground: true,
    pageRanges: '2',
});

// ── Verso ──
await page.evaluate(() => {
    document.querySelector('.card-back').style.display = '';
    document.querySelector('.card-front').style.display = 'none';
});
await page.pdf({
    path: 'card-back.pdf',
    width: '85mm',
    height: '55mm',
    printBackground: true,
    pageRanges: '2',
});

await browser.close();