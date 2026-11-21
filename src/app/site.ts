/* ============================================================
   SITE-WIDE CONSTANTS FOR /roni-paul  (edit here, used everywhere)
   ============================================================ */

/* Change to https://ronipaul.com once the domain is live. Every absolute
   URL in metadata, schema, sitemap and share cards derives from this. */
export const SITE_URL = "https://ronipaul.com";
/* The MedMate company website (medmatepharmacy.com), linked from the footer, MedMate section and schema. */
export const MEDMATE_URL = "https://medmatepharmacy.com";
export const PAGE_PATH = ""; // served at the domain root
export const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
/* Date of the last content change (ISO). Bump when copy changes; feeds schema dateModified, llms.txt and the footer. */
/* Google Analytics 4 measurement ID (G-XXXXXXX). Empty = no analytics tag rendered. */
export const GA_ID = "G-YQ12B4QNCG";

export const UPDATED = "2026-11-16";
export const PERSON_ID = `${PAGE_URL}#person`;

/* One canonical spelling of name and title. Do not vary it anywhere. */
export const NAME = "Roni Paul";
export const TITLE = "Founder & CEO, MedMate";
/* The one descriptor used everywhere (title tag, schema, bios, social). Keep identical across profiles. */
export const DESCRIPTOR = "Health-Tech Entrepreneur";
export const NAME_TITLE = `${NAME}, ${TITLE}`;
export const COMPANY = "MedMate";
export const COMPANY_LEGAL = "Medmate India Technology Private Limited";
export const CITY = "Bengaluru";
export const LOCATION = "HSR Layout, Bengaluru, Karnataka";

export const CONTACT = {
  email: "theronipaul@gmail.com",
  location: LOCATION,
  companySite: "https://medmatepharmacy.com",
};

/* Social & directory profiles. Fill the URL to switch a profile on;
   empty ones are hidden from the page and from the Person schema.
   Every one of these should link BACK to PAGE_URL in its website field. */
export const SOCIAL: { key: string; label: string; url: string; handle?: string }[] = [
  { key: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/the-roni-paul", handle: "in/the-roni-paul" },
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/the_roni_paul", handle: "@the_roni_paul" },
  { key: "facebook", label: "Facebook", url: "https://www.facebook.com/theronipaul", handle: "@theronipaul" },
  { key: "x", label: "X", url: "", handle: "@the_roni_paul" },
  { key: "youtube", label: "YouTube", url: "", handle: "@the_roni_paul" },
  { key: "crunchbase", label: "Crunchbase", url: "" },
  { key: "angellist", label: "Wellfound", url: "" },
];
export const LINKEDIN = SOCIAL[0].url;
export const INSTAGRAM = SOCIAL.find(x => x.key === "instagram")!;
export const sameAs = () => SOCIAL.filter(s => s.url).map(s => s.url);

/* Search-engine verification tokens (Google Search Console → HTML tag; Bing Webmaster). */
export const VERIFICATION = {
  google: "",
  bing: "",
};

/* Photos: descriptive file names carry the name + role for image search. */
export const IMG = {
  headshot: "/roni-paul/roni-paul-founder-medmate-bengaluru.jpg",
  /* 168px-wide copy for bylines and author boxes, so a 44px avatar does not download the full photo. */
  headshotThumb: "/roni-paul/roni-paul-headshot-thumb.jpg",
  shareCard: "/roni-paul/roni-paul-founder-medmate-share-card.jpg",
  logoLight: "/roni-paul/medmate-logo-light.png",
  logoDark: "/roni-paul/medmate-logo-dark.png",
  /* Decorative only: drawn as a CSS background and disallowed in robots.txt so search engines never use it as the page thumbnail. */
  signature: "/roni-paul/sig/rp-mark.png",
  favicon: "/roni-paul/favicon.svg",
};

/* Topics as linked entities (Wikipedia URLs) so search engines and AI assistants can disambiguate them. */
export const KNOWS_ABOUT = [
  { name: "Pharmacy", url: "https://en.wikipedia.org/wiki/Pharmacy" },
  { name: "Health technology", url: "https://en.wikipedia.org/wiki/Health_technology" },
  { name: "Quick commerce", url: "https://en.wikipedia.org/wiki/Quick_commerce" },
  { name: "Pharmaceutical distribution", url: "https://en.wikipedia.org/wiki/Pharmaceutical_distribution" },
  { name: "Electronic prescribing", url: "https://en.wikipedia.org/wiki/Electronic_prescribing" },
  { name: "Entrepreneurship", url: "https://en.wikipedia.org/wiki/Entrepreneurship" },
  { name: "Software as a service", url: "https://en.wikipedia.org/wiki/Software_as_a_service" },
  { name: "Medical technology", url: "https://en.wikipedia.org/wiki/Health_technology" },
  { name: "Bengaluru", url: "https://en.wikipedia.org/wiki/Bengaluru" },
  { name: "Assam", url: "https://en.wikipedia.org/wiki/Assam" },
];
/* MedMate (the company) public profiles. */
export const COMPANY_SAMEAS = ["https://www.instagram.com/medmateonlinepharmacy"];
export const COMPANY_FOUNDED = "2026-07-14";
export const COMPANY_ADDRESS = { "@type": "PostalAddress", streetAddress: "2nd Floor, No 190/108/2, Lakedew Residency, Haralur Main Road", addressLocality: "Bengaluru", addressRegion: "Karnataka", postalCode: "560102", addressCountry: "IN" };
