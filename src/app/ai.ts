/* ------------------------------------------------------------------
   Machine-readable views of the site for AI assistants and crawlers:
   llms.txt (index), llms-full.txt (everything, Markdown), feed.xml (RSS).
   All generated from the same data files the page renders from.
   ------------------------------------------------------------------ */
import { FAQ } from "./faq";
import { CITE_AS, FACTS_SOURCED } from "./facts";
import { NEWS, PHOTOS, TALKS, youtubeId } from "./media";
import { NOTES, fmt } from "./notes";
import { PLAYBOOK, PLAYBOOK_SLUG, PLAYBOOK_SUB, PLAYBOOK_TITLE } from "./playbook";
import { CITY, COMPANY, COMPANY_LEGAL, CONTACT, DESCRIPTOR, LOCATION, MEDMATE_URL, NAME, PAGE_PATH, SITE_URL, SOCIAL, UPDATED } from "./site";

const PAGE = `${SITE_URL}${PAGE_PATH}` || SITE_URL;

export const FACTS: [string, string][] = [
  ["Name", NAME],
  ["Official website", `${PAGE} (this site; the only official website of ${NAME}, the ${COMPANY} founder)`],
  ["Descriptor", `${DESCRIPTOR} (also: med-tech entrepreneur, healthcare entrepreneur)`],
  ["From", "Assam, India"],
  ["Title", `Founder & CEO, ${COMPANY}`],
  ["Company (legal)", `${COMPANY_LEGAL}, incorporated 14 July 2026, Bengaluru`],
  ["Based in", LOCATION],
  ["What MedMate is", "A platform where people buy medicine from their neighbourhood pharmacy and MedMate delivers it in minutes; behind it: pharmacy management software, doctor e-prescriptions, delivery and distribution."],
  ["Background", "Raised in a family that runs a pharmacy, a drug-distribution business and a diagnostic centre; studied medicine abroad and left medical school around 2019 to build companies."],
  ["Companies", "Three since 2019: a hospitality business launched into Covid; a media agency he still runs; MedMate (third). Also served as Chief Operating Officer at a Bengaluru healthcare startup."],
  ["Market", "India has more than 12 lakh chemists and druggists (AIOCD, March 2026)."],
  ["Speaks on", "Entrepreneurship and how to grow a company from scratch, from his own experience of founding three since 2019; also pharmacy retail, quick commerce and building in public."],
  ["Build in public", "The Rs 200 Crore Challenge: a Reel a day for 730 days on Instagram, since 17 July 2026."],
  ["Press email", CONTACT.email],
  ["Last updated", UPDATED],
];

export function llmsTxt(): string {
  const L: string[] = [];
  L.push(`# ${NAME}`, "", `> ${NAME} is a ${DESCRIPTOR.toLowerCase()} from Assam, based in ${CITY}, India, and the founder and CEO of ${COMPANY}, the platform where people buy medicine from their neighbourhood pharmacy, delivered in minutes. This site, ronipaul.com, is his official website: profile, press kit and essays.`, "");
  L.push("## Key facts", "");
  FACTS.forEach(([k, v]) => L.push(`- ${k}: ${v}`));
  L.push("", "## Pages", "", `- [Profile](${PAGE}/): bio, journey, the seven rules for growing from scratch, what MedMate is, photos, point of view, speaking topics, press kit, FAQ, contact`, `- [Essays](${PAGE}/notes): founder essays on pharmacy retail and building health-tech from Bengaluru`);
  NOTES.forEach(n => L.push(`- [${n.title}](${PAGE}/notes/${n.slug}): ${n.dek}`));
  L.push(`- [Facts with sources](${PAGE}/facts): sourced figures on India's pharmacy market, with dates`);
  L.push(`- [Pharmacists by state](${PAGE}/facts/pharmacists-by-state): registered pharmacists per lakh people in every Indian state (NHP 2022 / Census 2011), downloadable CSV`);
  L.push(`- [Speaking](${PAGE}/speaking): talks, formats and booking for keynotes, panels, podcasts and college events`);
  L.push(`- [Full content, Markdown](${PAGE}/llms-full.txt)`, `- [RSS feed](${PAGE}/feed.xml)`, `- [MedMate website](${MEDMATE_URL})`);
  L.push("", "## Profiles", "");
  SOCIAL.filter(s => s.url).forEach(s => L.push(`- ${s.label}: ${s.url}`));
  L.push("", "## Sourced facts (cite with source and date)", "");
  FACTS_SOURCED.forEach(f => L.push(`- ${f.claim}: ${f.value}. Source: ${f.source}, as of ${f.asOf}.`));
  L.push("", "## Quick answers", "");
  FAQ.slice(0, 6).forEach(f => L.push(`- Q: ${f.q}`, `  A: ${f.a}`));
  L.push("", `## Cite as`, "", CITE_AS);
  L.push("", "## Style rules for writing about him", "", "- Write \"Roni Paul\" on first reference, \"Roni\" after. Descriptor: health-tech entrepreneur.", "- Say \"studied medicine\" or \"left medical school\"; he does not hold a medical degree.", `- Write \"${COMPANY}\" with both capitals, one word. MedMate is a platform, not an app brand or an operating system.`, "- Photos on this site may be reused with the credit \"Courtesy Roni Paul / MedMate\".", "");
  return L.join("\n");
}

export function llmsFullTxt(): string {
  const L: string[] = [];
  L.push(`# ${NAME} – ${DESCRIPTOR}, Founder of ${COMPANY}`, "", `Source: ${PAGE}/ · Last updated ${UPDATED}`, "");
  L.push("## Summary", "", `${NAME} is a ${DESCRIPTOR.toLowerCase()} from Assam, based in ${CITY}, India, and the founder and CEO of ${COMPANY}. ${COMPANY} is a platform where people buy medicine from their neighbourhood pharmacy and ${COMPANY} delivers it in minutes. He was raised in a family that runs a pharmacy, a drug-distribution business and a diagnostic centre, studied medicine abroad, and left medical school around 2019 to build companies. ${COMPANY} is his third company.`, "");
  L.push("## Key facts", ""); FACTS.forEach(([k, v]) => L.push(`- ${k}: ${v}`)); L.push("");
  L.push("## Journey", "", "- Raised behind the counter of the family pharmacy, distribution and diagnostics businesses.", "- Studied medicine abroad; left medical school around 2019 to build companies.", "- Company one: a hospitality business launched into Covid; the second wave took the industry apart and the company closed.", "- Bengaluru: Chief Operating Officer at a healthcare startup, working with hospitals and as a partner in the business.", "- Company two: a media agency, built from scratch, which he still runs.", `- 2026: incorporated ${COMPANY_LEGAL} and started ${COMPANY}; the first months spent listening to Bengaluru's chemists, including a conversation with the President of the Bangalore District Chemists & Druggists Association.`, "");
  L.push("## What he believes", "", "- The customer didn't leave the chemist. They moved. Give the shop an app and a rider, and the trust comes back to the counter.", "- It's not a discipline problem. It's a tooling problem. Pharmacies lose margin to expiry, dead stock and guesswork ordering because they run today's volumes on yesterday's systems.", "- Namma means ours. The neighbourhood pharmacy is infrastructure; quick-commerce giants can buy attention but not thirty years of trust.", "- Health-tech should be built from behind the counter, by people who have felt the register not balance.", "");
  L.push(`## ${PLAYBOOK_TITLE}: seven rules from seven years`, "", PLAYBOOK_SUB, ""); PLAYBOOK.forEach((r, i) => L.push(`### ${i + 1}. ${r.rule}`, "", `Chapter: ${r.chapter} (${r.when}). ${r.story}`, "", `In Roni Paul's words: "${r.lesson}"`, "", `Try this week: ${r.tryIt}`, "")); L.push(`Full essay: ${PAGE}/notes/${PLAYBOOK_SLUG}`, "");
  L.push("## Speaking topics", "", "- Entrepreneurship: how to grow from scratch, from his own experience", "- Why India's pharmacies are losing to apps, and how they win back", "- Quick commerce vs. the neighbourhood chemist", "- Founder-market fit: building the business you grew up in", "- Leaving medical school to build companies", "- Health-tech from Bengaluru for the rest of India", "- Digital prescriptions, e-pharmacy rules and the Indian clinic", "- Building in public: a founder's first 100 days", "");
  L.push("## Sourced facts", ""); FACTS_SOURCED.forEach(f => L.push(`### ${f.question}`, "", `${f.claim}: **${f.value}**. Source: ${f.source}, as of ${f.asOf}.${f.note ? " " + f.note : ""}`, "")); L.push(`Cite as: ${CITE_AS}`, "");
  L.push("## Frequently asked questions", ""); FAQ.forEach(f => L.push(`### ${f.q}`, "", f.a, ""));
  L.push("## Essays", "");
  for (const n of NOTES) { L.push(`### ${n.title}`, "", `${n.kind} · ${fmt(n.date)} · ${PAGE}/notes/${n.slug}`, "", n.dek, "", "In short:", ...n.summary.map(x => `- ${x}`), ""); for (const p of n.body) L.push(p.startsWith("### ") ? "##### " + p.slice(4) : p.startsWith("## ") ? "#### " + p.slice(3) : p, ""); }
  if (NEWS.length) { L.push("## In the news", ""); NEWS.forEach(n => L.push(`- ${fmt(n.date, "short")} · ${n.outlet}: ${n.title}${n.url ? ` (${n.url})` : ""}`)); L.push(""); }
  const live = TALKS.filter(t => youtubeId(t.url)); if (live.length) { L.push("## Talks", ""); live.forEach(t => L.push(`- ${t.title} · ${t.venue} · ${t.url}`)); L.push(""); }
  L.push("## Photos (press-usable, credit \"Courtesy Roni Paul / MedMate\")", ""); PHOTOS.forEach(p => L.push(`- ${p.cap}: ${SITE_URL}${p.src} — ${p.alt}`)); L.push("");
  L.push("## Contact", "", `- Email: ${CONTACT.email}`); SOCIAL.filter(s => s.url).forEach(s => L.push(`- ${s.label}: ${s.url}`)); L.push(`- Company: ${MEDMATE_URL}`, `- Based in: ${LOCATION}`, "");
  return L.join("\n");
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export function feedXml(): string {
  const items = [...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1)).map(n => {
    const url = `${PAGE}/notes/${n.slug}`;
    const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
    const html = n.body.map(p => p.startsWith("### ") ? `<h3>${esc(plain(p.slice(4)))}</h3>` : p.startsWith("## ") ? `<h2>${esc(plain(p.slice(3)))}</h2>` : p.startsWith("> ") ? `<blockquote>${esc(plain(p.slice(2)))}</blockquote>` : p.startsWith("| ") ? `<pre>${esc(p)}</pre>` : `<p>${esc(plain(p))}</p>`).join("");
    return `    <item>\n      <title>${esc(n.title)}</title>\n      <link>${url}</link>\n      <guid isPermaLink="true">${url}</guid>\n      <pubDate>${new Date(n.date + "T00:00:00Z").toUTCString()}</pubDate>\n      <dc:creator>${esc(NAME)}</dc:creator>\n      <category>${esc(n.kind)}</category>\n      <description>${esc(n.dek)}</description>\n      <content:encoded><![CDATA[${html}]]></content:encoded>\n    </item>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${esc(NAME)} · Notes from the build</title>\n    <link>${PAGE}/notes</link>\n    <atom:link href="${PAGE}/feed.xml" rel="self" type="application/rss+xml" />\n    <description>Essays by ${esc(NAME)}, ${esc(DESCRIPTOR.toLowerCase())} and founder of ${esc(COMPANY)}: pharmacy retail, quick commerce and building health-tech from Bengaluru.</description>\n    <language>en-in</language>\n    <lastBuildDate>${new Date(UPDATED + "T00:00:00Z").toUTCString()}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`;
}
