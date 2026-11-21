// Renders a 1200x630 share card per essay (and one for the Facts page) into public/roni-paul/og/.
// Usage: node scripts/render-essay-cards.js   (needs Google Chrome + puppeteer-core)
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const src = fs.readFileSync(path.join(__dirname, "../src/app/notes.ts"), "utf8");
const essays = [...src.matchAll(/slug: "([^"]+)",\s*kind: "([^"]+)",\s*title: "([^"]+)"/g)].map(m => ({ slug: m[1], kind: m[2], title: m[3] }));
essays.push({ slug: "facts", kind: "Sourced facts", title: "India's pharmacy market in numbers" });
essays.push({ slug: "speaking", kind: "Speaking", title: "Invite Roni Paul to speak" });
essays.push({ slug: "pharmacists-by-state", kind: "Sourced facts", title: "Pharmacists per lakh people, by Indian state" });
const photo = "data:image/jpeg;base64," + fs.readFileSync(path.join(__dirname, "../public/roni-paul/roni-paul-founder-medmate-bengaluru.jpg")).toString("base64");
const html = (e) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>html,body{margin:0}.c{width:1200px;height:630px;position:relative;overflow:hidden;background:#11331F;color:#fff;font-family:Inter,sans-serif}
.glow{position:absolute;right:-160px;bottom:-220px;width:720px;height:720px;border-radius:50%;background:radial-gradient(closest-side,rgba(217,166,72,.35),transparent 70%)}
.k{position:absolute;left:84px;top:72px;font-family:'IBM Plex Mono',monospace;font-size:16px;letter-spacing:.16em;text-transform:uppercase;color:#D9A648}
h1{position:absolute;left:84px;top:118px;width:760px;margin:0;font-family:Fraunces,serif;font-weight:400;font-size:${e.title.length > 40 ? 58 : 68}px;line-height:1.04;letter-spacing:-.02em}
.by{position:absolute;left:84px;bottom:64px;display:flex;align-items:center;gap:16px}
.by img{width:64px;height:64px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid rgba(255,255,255,.25)}
.by b{display:block;font-family:Fraunces,serif;font-weight:500;font-size:22px}.by span{font-size:15px;color:#8FD4A8}
.url{position:absolute;right:84px;bottom:72px;font-family:'IBM Plex Mono',monospace;font-size:15px;letter-spacing:.08em;color:rgba(255,255,255,.6)}
.bar{position:absolute;left:84px;top:96px;width:56px;height:3px;background:#D9A648}</style></head><body>
<div class="c"><div class="glow"></div><div class="k">${e.kind} · Notes from the build</div><div class="bar"></div><h1>${e.title}</h1>
<div class="by"><img src="${photo}"><div><b>Roni Paul</b><span>Health-tech entrepreneur · Founder & CEO, MedMate</span></div></div><div class="url">ronipaul.com</div></div></body></html>`;
(async () => {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const p = await b.newPage(); await p.setViewport({ width: 1200, height: 630 });
  for (const e of essays) {
    await p.setContent(html(e), { waitUntil: "load", timeout: 90000 }); await p.evaluate(() => document.fonts.ready); await new Promise(r => setTimeout(r, 1500));
    const out = path.join(__dirname, `../public/roni-paul/og/${e.slug}.jpg`);
    await p.screenshot({ path: out, type: "jpeg", quality: 88, clip: { x: 0, y: 0, width: 1200, height: 630 } }); console.log("wrote", out);
  }
  await b.close();
})();
