import type { MetadataRoute } from "next";
import { SITE_URL } from "./site";

/* Search engines plus the crawlers behind ChatGPT, Gemini, Claude, Perplexity, Meta AI, Apple Intelligence,
   Amazon/Alexa, Bing Copilot, You.com, DuckDuckGo and the Common Crawl corpus most models train on.
   All are allowed explicitly so a future default change elsewhere cannot silently hide the site. */
const AI_AGENTS = ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "Google-Extended", "GoogleOther", "Gemini", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Meta-ExternalAgent", "Meta-ExternalFetcher", "FacebookBot", "Applebot", "Applebot-Extended", "Amazonbot", "Bingbot", "YouBot", "DuckAssistBot", "CCBot", "cohere-ai", "MistralAI-User", "Bytespider", "LinkedInBot", "Twitterbot"];

const SIG_DIR = "/roni-paul/sig/";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* The signature is decoration, not a picture of Roni: keep it out of image search and page thumbnails. */
      { userAgent: "*", allow: "/", disallow: SIG_DIR },
      { userAgent: ["Googlebot", "Googlebot-Image"], allow: "/", disallow: SIG_DIR },
      ...AI_AGENTS.map(userAgent => ({ userAgent, allow: "/", disallow: SIG_DIR })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
