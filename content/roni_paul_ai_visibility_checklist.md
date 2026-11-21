# Being found by Google and by AI assistants

## What is already live on the site

- **Explicit welcome for AI crawlers.** `robots.txt` now names the crawlers behind ChatGPT (GPTBot, OAI-SearchBot), Gemini (Google-Extended), Claude (ClaudeBot), Perplexity, Meta AI, Apple Intelligence, Amazon, Bing Copilot, You.com, DuckDuckGo and Common Crawl, and allows every one of them. Most sites block these by accident; this one invites them.
- **A machine-readable summary at `/llms.txt`.** The emerging standard that AI assistants read first: who Roni is, the key facts, the pages, the profiles and the style rules for writing about him. `/llms-full.txt` carries the entire site as plain Markdown so a model can quote it accurately.
- **An RSS feed at `/feed.xml`** with the full text of every essay. Feeds are crawled continuously and are one of the cleanest ways to get new writing into search and AI indexes within hours.
- **Linked-entity schema.** The page now declares a WebSite, an Organization for MedMate (legal name, incorporation date 14 July 2026, registered address, founder) and a Person whose topics point at Wikipedia entities, with an alternate name for the Instagram handle. This is how Google builds a knowledge panel and how assistants disambiguate "Roni Paul".
- **Speakable markup** on the hero line and the lead paragraph, the sentences voice assistants read aloud.
- **A visible and declared "last updated" date**, plus `dateModified` in schema. Freshness is a ranking signal for both search and AI citation.
- **IndexNow key installed.** One command tells Bing, which powers ChatGPT search and Copilot, about changed pages instantly instead of waiting for a crawl.

## What only you can do, in order of impact

1. **Google Search Console.** Add the site, choose the HTML-tag method, paste the token into `VERIFICATION.google` in `site.ts`, redeploy, verify, then submit `sitemap.xml`. Do the same at Bing Webmaster Tools (`VERIFICATION.bing`). Bing is the index ChatGPT uses.
2. **Run the IndexNow ping after every deploy:** `node scripts/indexnow-ping.mjs https://namma-medmate.netlify.app`.
3. **Make every profile say the same thing.** LinkedIn headline, Instagram bio, X, YouTube: "Health-tech entrepreneur · Founder & CEO, MedMate", and set the website field on each to the profile URL. Then add the URLs to `SOCIAL` in `site.ts`. Assistants trust facts that match across sources.
4. **Create a Wikidata item for Roni Paul** (free, ten minutes): human, Indian, entrepreneur, founder of MedMate, official website, Instagram and LinkedIn IDs. Wikidata is read directly by Google and by most AI assistants; it is the single highest-leverage off-site step.
5. **Claim Crunchbase and Wellfound founder profiles** for MedMate with Roni as founder, linking the website. Both are heavily cited in AI answers about startups.
6. **Link from the MedMate Google Business Profile** (info@medmate.in) to the founder page in the description or posts, and from medmatepharmacy.com's footer.
7. **Get three independent mentions.** A YourStory or Inc42 founder story, a BDCDA newsletter mention, a podcast appearance. Each should link to the profile with "Roni Paul" as the anchor text. Add each to `NEWS` in `media.ts` so the News section appears.
8. **Publish essays monthly** and ping IndexNow each time. The essays are what rank for topic queries like "pharmacy expiry losses India"; the profile alone ranks only for the name.
9. **Buy the domain.** `ronipaul.com` as the canonical home multiplies every signal above; the standalone project in `RoniPaulSite/` is ready to connect.

## How to check it is working

- Search `Roni Paul MedMate` on Google, Bing and Perplexity monthly; ask ChatGPT and Gemini "Who is Roni Paul, founder of MedMate?" and note what they cite.
- Google Search Console → Performance shows which queries surface the page.
- `site:namma-medmate.netlify.app/roni-paul` on Bing confirms indexing.
- Paste the page URL into Google's Rich Results Test to confirm the schema parses.
