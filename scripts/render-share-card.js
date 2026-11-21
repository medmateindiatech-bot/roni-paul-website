// node scripts/render-share-card.js scripts/share-card.html public/roni-paul/roni-paul-founder-medmate-share-card.jpg
const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  const p = await b.newPage(); await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await p.goto('file://' + require('path').resolve(process.argv[2]), { waitUntil: 'networkidle0' });
  await p.evaluate(() => document.fonts.ready); await new Promise(r => setTimeout(r, 500));
  await p.screenshot({ path: process.argv[3], type: 'jpeg', quality: 90, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await b.close();
})();
