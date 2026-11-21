import fs from "node:fs";
import vm from "node:vm";
const root = "/Users/apple/Documents/ClaudeKitchen/RoniPaulSite/src/app/";
const site: any = await import(root + "site.ts");
const media: any = await import(root + "media.ts");
const notes: any = await import(root + "notes.ts");
const faq: any = await import(root + "faq.ts");

// constants that live inside the client component (plain object literals, no JSX)
const src = fs.readFileSync(root + "RoniPaulClient.tsx", "utf8");
const chunk = src.slice(src.indexOf("const BIOS"), src.indexOf("/* ---------- small helpers"))
  .replace(/: \[string, string\]\[\]/g, "");
const ctx: any = { CONTACT: site.CONTACT, module: { exports: {} } };
vm.runInNewContext(chunk + "\nmodule.exports = { BIOS, STATS, JOURNEY, CAPABILITIES, BELIEFS, TOPICS, FACTS };", ctx);
const C = ctx.module.exports;

const L: string[] = [];
const h = (n: number, t: string) => L.push("", "#".repeat(n) + " " + t, "");
const p = (t: string) => L.push(t, "");

L.push(`# ${site.NAME} – ${site.DESCRIPTOR}, Founder of MedMate`, "");
p(`Website content export · ${site.SITE_URL}${site.PAGE_PATH} · generated ${new Date().toISOString().slice(0, 10)}`);
p(`**Title tag:** Roni Paul – Health-Tech Entrepreneur, Founder of MedMate  `);
p(`**Meta description:** Roni Paul is a health-tech entrepreneur from Bengaluru and the founder & CEO of MedMate, the platform where India buys medicine from its neighbourhood pharmacy, delivered in minutes.`);

h(2, "Hero");
p(`**Kicker (rotating):** ${media.ROLES.join(" · ")} · ${site.CITY}`);
p(`**Name:** Roni Paul`);
p(`**Lede:** The platform where India buys medicine from its neighbourhood pharmacy, delivered in minutes.`);
p(`**Sub:** Raised in a pharmacy family. Studied medicine. Seven years and three companies later, building the business he has known his whole life.`);
p(`**Buttons:** Press kit · Watch Roni speak · LinkedIn (${site.LINKEDIN})`);
p(`**Signature line:** Founder, MedMate`);

h(2, "Ticker");
media.TICKER.forEach((t: string) => L.push(`- ${t}`)); L.push("");

h(2, "At a glance");
L.push("| Number | Label | Note |", "|---|---|---|");
C.STATS.forEach((s: any) => L.push(`| ${s.n} | ${s.l} | ${s.s} |`)); L.push("");

h(2, "01 · About — The short version");
p("Roni Paul grew up inside the medicine business. His father and uncle run a pharmacy, a drug-distribution operation and a diagnostic centre, so he watched from childhood how a chemist buys, stocks, prices and sells, and where the money actually leaks.");
p("He went abroad to study medicine and left medical school to build companies instead. That was around 2019. His first was a hospitality business launched into Covid, an industry the pandemic then took apart twice. He moved to Bengaluru, joined a healthcare startup as Chief Operating Officer, working with hospitals and as a partner in the business, and then founded a media agency that he still runs.");
p("MedMate is his third company, and the one he has been preparing for his whole life. India's neighbourhood pharmacies are losing customers to apps that will never know their names. Not because the shops are worse, but because they have no software and no delivery. MedMate gives them both.");
p(`> "Your shop has looked after this neighbourhood for years. Somebody should look after your shop now." — Roni Paul, to Bengaluru's chemists`);

h(2, "02 · Journey — Seven years, three companies, one lifelong business");
p("Every company taught something the next one needed. This is the record, in order.");
C.JOURNEY.forEach((j: any) => { L.push(`### ${j.k} — ${j.t}`, "", j.d, ""); });

h(2, "Building in public (banner)");
p(`${media.BANNER.line1} ${media.BANNER.line2}`);
p(media.BANNER.sub);
p(`Follow ${site.INSTAGRAM.handle} — ${site.INSTAGRAM.url}`);

h(2, "03 · What he is building — MedMate");
p("A platform where people buy medicine from their neighbourhood pharmacy and MedMate delivers it in minutes. The shop keeps the customer. MedMate does everything else.");
C.CAPABILITIES.forEach((c: any) => L.push(`- **${c.t}** (${c.k}) — ${c.d}`)); L.push("");

h(2, "04 · On stage & on camera — Watch Roni speak");
p("Keynotes, panels, podcasts and the founder's own build-in-public series. Plain-spoken, from behind the counter.");
media.TALKS.forEach((t: any) => L.push(`- **${t.title}** — ${t.kind}${t.year ? " · " + t.year : ""} · ${t.venue} · ${t.url ? t.url : "recording coming soon"}`)); L.push("");

h(2, "05 · In frame — Photos");
p("Press-usable photographs. Tap any image to view it large; download from the press kit.");
media.PHOTOS.forEach((ph: any, i: number) => L.push(`${i + 1}. **${ph.cap}** — ${ph.alt}  \n   \`${ph.src}\` (${ph.w}×${ph.h})`)); L.push("");
p(`Photo licence: ${media.PHOTO_LICENCE.creditText} · ${media.PHOTO_LICENCE.license}`);

h(2, "06 · Point of view — What he believes");
p("Four positions he will defend on any stage. Quote freely.");
C.BELIEFS.forEach((b: any, i: number) => { L.push(`### 0${i + 1} · ${b.q}`, "", b.d, ""); });

h(2, "07 · Speaking & media — Topics he speaks on");
p("Plain-spoken, from behind the counter. Available for podcasts, panels, guest columns, campus talks and press comment on pharmacy retail and Indian health-tech.");
C.TOPICS.forEach((t: string) => L.push(`- ${t}`)); L.push("");
h(3, "Quick facts for journalists");
L.push("| Field | Value |", "|---|---|");
C.FACTS.forEach(([k, v]: [string, string]) => L.push(`| ${k} | ${v} |`)); L.push("");

h(2, "08 · Writing — Notes from the build");
p("What pharmacy owners actually say when you sit behind their counter, what it costs to put riders on the road, and the numbers as they come in. Published here first, then on LinkedIn.");
for (const n of notes.NOTES) {
  L.push(`### ${n.title}`, "", `*${n.kind} · ${notes.fmt(n.date)} · ${n.readMins} min read · ${site.SITE_URL}${site.PAGE_PATH}/notes/${n.slug}*`, "", `**${n.dek}**`, "");
  for (const para of n.body) L.push(para.startsWith("## ") ? "#### " + para.slice(3) : para.startsWith("> ") ? "> " + para.slice(2) : para, "");
}

h(2, "09 · In the news — Mentions, podcasts and panels");
media.NEWS.forEach((n: any) => L.push(`- ${notes.fmt(n.date, "short")} · **${n.outlet}** — ${n.title}${n.url ? ` (${n.url})` : " · upcoming"}`)); L.push("");

h(2, "10 · Press kit — Everything you need to write about Roni");
h(3, "One line"); p(C.BIOS.oneLine);
h(3, "50 words"); p(C.BIOS.short);
h(3, "Full bio"); C.BIOS.long.split("\n\n").forEach((para: string) => p(para));
h(3, "Downloads");
L.push(`- Headshot: \`${site.IMG.headshot}\` (JPG · 820×880 · ${media.PHOTO_LICENCE.creditText})`, `- MedMate logo: \`${site.IMG.logoLight}\``, `- Share card: \`${site.IMG.shareCard}\``, "");
h(3, "Style notes");
L.push("- Write “Roni Paul”, first reference; “Roni” after.", "- Descriptor: “health-tech entrepreneur”. Title: Founder & CEO, MedMate. Write “MedMate” with both capitals, one word.", "- Say “studied medicine” or “left medical school”, not a completed degree.", "- Lead with the track record: three companies since 2019. MedMate is the third.", `- Photos: free to use with credit “${media.PHOTO_LICENCE.creditText}”. No cropping into other people's branding.`, "");

h(2, "11 · Questions people ask — Straight answers");
faq.FAQ.forEach((f: any) => { L.push(`**${f.q}**`, "", f.a, ""); });

h(2, "12 · Contact");
p("Press, speaking, partnerships, or a pharmacy that wants to talk.");
L.push(`- Email: ${site.CONTACT.email}`);
site.SOCIAL.filter((x: any) => x.url).forEach((x: any) => L.push(`- ${x.label}: ${x.url}`));
L.push(`- Company: MedMate (${site.MEDMATE_URL})`, `- Based in: ${site.CONTACT.location}`, "");

h(2, "Footer");
p(`© 2026 ${site.NAME_TITLE} · ${site.COMPANY_LEGAL} · Built in Bengaluru, by a pharmacy family.`);

fs.writeFileSync("/Users/apple/Documents/ClaudeKitchen/RoniPaulSite/content/Roni_Paul_Website_Content.md", L.join("\n"));
console.log("written", L.length, "lines");
