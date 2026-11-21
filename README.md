# Roni Paul — founder website (standalone)

Personal / PR site for **Roni Paul – Health-Tech Entrepreneur, Founder of MedMate**.
A self-contained Next.js 16 project: this folder has everything — code, content, photos, video, share card.
The page is served at the domain root (`/`), essays at `/notes/<slug>`.

Live at https://ronipaul.com (Netlify site `ronipaul`). Theme: Midnight dark, see the MIDNIGHT block at the end of roni.css.
This folder is the version for its own domain (set to `https://ronipaul.com` in `src/app/site.ts`).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Node 18+ required. On this Mac, Node lives at `~/.local/node/bin` (not on PATH):
`export PATH="$HOME/.local/node/bin:$PATH"` first.

## Deploy

- **Netlify** (what the live site uses): `netlify init` in this folder, then `netlify deploy --prod --build`.
  `netlify.toml` is already here (`@netlify/plugin-nextjs`).
- **Vercel**: `vercel` — zero config.
- **AWS Amplify**: connect the repo; Amplify detects Next.js.

After pointing the domain: change `SITE_URL` in `src/app/site.ts` if it is not `https://ronipaul.com`, redeploy,
then verify the domain in Google Search Console and submit `/sitemap.xml`.

## Folder map

```
src/app/
  layout.tsx            <html>/<body>, Google Fonts (Fraunces, Inter, IBM Plex Mono), <title>, meta,
                        Open Graph / Twitter, favicon, Search Console verification slots
  page.tsx              the profile page: JSON-LD @graph (Person, ProfilePage, FAQPage, ImageObject,
                        VideoObject, Article, ItemList) + <RoniPaulClient/>
  RoniPaulClient.tsx    every section: hero, ticker, stats, about, journey, banner video, MedMate,
                        talks, photos, point of view, speaking, essays, news, press kit, FAQ, contact, footer
  roni.css              all styles (prefix rp-), phone rules at the end
  globals.css           body reset
  site.ts               ONE place for name, DESCRIPTOR, SITE_URL, MEDMATE_URL, social links, email, image paths,
                        verification tokens
  media.ts              TALKS (paste YouTube URLs), PHOTOS (strip order, captions, alt), BANNER (video loop),
                        NEWS, TICKER, ROLES, PHOTO_LICENCE
  notes.ts              the three essays
  faq.ts                six FAQ answers (visible + FAQPage schema)
  notes/                essay index + /notes/[slug] pages, NotesShell chrome
  sitemap.ts, robots.ts
public/roni-paul/       every asset (headshot, share card, banner, 2-s video mp4/webm + poster, signature,
                        logos, favicon) and gallery/ with the 13 strip photos (web-sized, max 2000px)
content/                full-site Markdown export, SEO positioning PDF + source
scripts/                share-card.html + render-share-card.js (regenerate the 1200×630 Open Graph card;
                        needs puppeteer-core + Google Chrome), export-content-to-markdown.mts
netlify.toml
```

## How to change things

| What | Where |
|---|---|
| Bios, stats, journey, capabilities, beliefs, topics, journalist facts | `RoniPaulClient.tsx` (constants at the top) |
| FAQ | `faq.ts` |
| Essays | `notes.ts` (add an object; it gets its own page, schema and sitemap entry) |
| Add a photo | drop it in `public/roni-paul/gallery/`, add a row to `PHOTOS` in `media.ts`; array order = strip order; `ratio: "natural"` shows it uncropped |
| Talk videos | paste the YouTube link into `TALKS[].url` in `media.ts`; the card becomes a click-to-play player |
| Descriptor, links, email, domain | `site.ts` |
| Share card | edit `scripts/share-card.html`, run `node scripts/render-share-card.js scripts/share-card.html public/roni-paul/roni-paul-founder-medmate-share-card.jpg` |

## Copy rules (from Roni)

- Descriptor everywhere: **health-tech entrepreneur**. "Serial entrepreneur" only as a secondary phrase.
- MedMate is a **platform** — "medicine from your neighbourhood pharmacy, delivered in minutes". Never "operating system". Say "MedMate" only; no separate product brands; no government work.
- No first-company revenue figure; never "profitable"; company two = a media agency he still runs; Bengaluru role = Chief Operating Officer at a healthcare startup.
- "Studied medicine" / "left medical school" — never a completed degree.
- No official BDCDA collaboration — only a conversation with its President. Journey entry is Roni-only (no co-founder/advisor names there; photo captions keep them).
- Tagline pronoun: "The customer didn't leave the chemist. **They** moved."
- Never format dates with locale APIs in server-rendered text (hydration mismatch) — use `fmt()` in `notes.ts`.

## Still to fill in

- `SOCIAL` entries for X, YouTube, Crunchbase, Wellfound (empty URL = hidden).
- `VERIFICATION.google` / `.bing` tokens.
- Real YouTube links in `TALKS`; event name + date for the college-talk photos; real items in `NEWS`.
- Confirm the press email in `site.ts` (`roni@nammamedmate.com` is a placeholder).
