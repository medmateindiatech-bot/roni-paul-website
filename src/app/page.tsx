import RoniPaulClient from "./RoniPaulClient";
import { FAQ } from "./faq";
import { NEWS, PHOTOS, PHOTO_LICENCE, TALKS, youtubeId } from "./media";
import { NOTES } from "./notes";
import { PLAYBOOK, PLAYBOOK_SLUG, PLAYBOOK_SUB, PLAYBOOK_TITLE } from "./playbook";
import { CITY, COMPANY, COMPANY_ADDRESS, COMPANY_FOUNDED, COMPANY_LEGAL, COMPANY_SAMEAS, IMG, KNOWS_ABOUT, MEDMATE_URL, NAME, PAGE_URL, PERSON_ID, SITE_URL, UPDATED, sameAs } from "./site";

/* ------------------------------------------------------------------
   Structured data. One @graph so every node can reference the Person by @id.
   ------------------------------------------------------------------ */
const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: NAME,
  givenName: "Roni",
  familyName: "Paul",
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  disambiguatingDescription: "Health-tech entrepreneur from Assam, based in Bengaluru; founder and CEO of MedMate. Official website: ronipaul.com.",
  image: { "@type": "ImageObject", "@id": `${PAGE_URL}#headshot`, url: abs(IMG.headshot), width: 820, height: 880, caption: `${NAME}, Founder & CEO, ${COMPANY}` },
  jobTitle: "Founder & CEO",
  description:
    "Indian health-tech and med-tech entrepreneur from Assam, based in Bengaluru; founder and CEO of MedMate. MedMate is the platform where people buy medicine from their neighbourhood pharmacy, delivered in minutes.",
  worksFor: { "@type": "Organization", "@id": `${MEDMATE_URL}#org`, name: COMPANY, legalName: COMPANY_LEGAL, url: MEDMATE_URL },
  founder: [{ "@type": "Organization", "@id": `${MEDMATE_URL}#org`, name: COMPANY, url: MEDMATE_URL }],
  hasOccupation: [{ "@type": "Occupation", name: "Health-tech entrepreneur", occupationalCategory: "11-1011.00" }, { "@type": "Occupation", name: "Med-tech entrepreneur", occupationalCategory: "11-1011.00" }],
  knowsAbout: KNOWS_ABOUT.map(k => ({ "@type": "Thing", name: k.name, sameAs: k.url })),
  alternateName: ["Roni Paul MedMate", "the_roni_paul"],
  subjectOf: { "@id": `${PAGE_URL}#page` },
  knowsLanguage: ["en", "hi", "as"],
  homeLocation: { "@type": "Place", name: `${CITY}, Karnataka, India` },
  workLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: CITY, addressRegion: "Karnataka", addressCountry: "IN" } },
  nationality: { "@type": "Country", name: "India" },
  birthPlace: { "@type": "Place", name: "Assam, India", sameAs: "https://en.wikipedia.org/wiki/Assam" },
  sameAs: sameAs(),
};

const PROFILE_PAGE = {
  "@type": "ProfilePage",
  "@id": `${PAGE_URL}#page`,
  url: PAGE_URL,
  name: `${NAME}, Founder & CEO, ${COMPANY}`,
  mainEntity: { "@id": PERSON_ID },
  dateModified: UPDATED,
  speakable: { "@type": "SpeakableSpecification", cssSelector: [".rp-hero-lede", ".rp-lead"] },
  inLanguage: "en-IN",
  primaryImageOfPage: { "@id": `${PAGE_URL}#headshot` },
  image: { "@id": `${PAGE_URL}#headshot` },
  thumbnailUrl: abs(IMG.headshot),
  isPartOf: { "@id": `${SITE_URL}#website` },
};

const FAQ_PAGE = {
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  mainEntity: FAQ.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const VIDEOS = TALKS.filter(t => youtubeId(t.url)).map(t => {
  const id = youtubeId(t.url)!;
  return {
    "@type": "VideoObject",
    name: t.title,
    description: t.description || `${NAME} on ${t.title.toLowerCase()}. ${t.venue}.`,
    thumbnailUrl: [`https://img.youtube.com/vi/${id}/maxresdefault.jpg`, `https://img.youtube.com/vi/${id}/hqdefault.jpg`],
    uploadDate: t.date || undefined,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    contentUrl: t.url,
    ...(t.transcript ? { transcript: t.transcript } : {}),
    actor: { "@id": PERSON_ID },
    publisher: { "@type": "Organization", name: COMPANY },
  };
});

const IMAGES = PHOTOS.map(p => ({
  "@type": "ImageObject",
  contentUrl: abs(p.src),
  url: abs(p.src),
  width: p.w,
  height: p.h,
  caption: p.alt,
  representativeOfPage: false,
  creditText: PHOTO_LICENCE.creditText,
  license: PHOTO_LICENCE.license,
  acquireLicensePage: abs(PHOTO_LICENCE.acquireLicensePage),
  copyrightNotice: `© ${NAME}`,
  creator: { "@id": PERSON_ID },
  about: { "@id": PERSON_ID },
}));

const ARTICLES = NOTES.map(n => ({
  "@type": "Article",
  headline: n.title,
  description: n.dek,
  url: `${PAGE_URL}/notes/${n.slug}`,
  datePublished: n.date,
  dateModified: n.date,
  author: { "@id": PERSON_ID },
  keywords: n.keywords.join(", "),
}));

/* The seven rules Roni speaks on, as a list search engines and assistants can quote. */
const PLAYBOOK_LIST = {
  "@type": "ItemList",
  "@id": `${PAGE_URL}#scratch`,
  name: `${PLAYBOOK_TITLE}: seven rules by ${NAME}`,
  description: PLAYBOOK_SUB,
  url: `${PAGE_URL}/notes/${PLAYBOOK_SLUG}`,
  numberOfItems: PLAYBOOK.length,
  itemListElement: PLAYBOOK.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.rule, description: `${r.story} ${r.lesson}` })),
};

const NEWS_LIST = {
  "@type": "ItemList",
  name: `${NAME} in the news`,
  itemListElement: NEWS.map((n, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${n.outlet}: ${n.title}`,
    ...(n.url ? { url: n.url } : {}),
  })),
};

const ORG = {
  "@type": "Organization",
  "@id": `${MEDMATE_URL}#org`,
  name: COMPANY,
  legalName: COMPANY_LEGAL,
  url: MEDMATE_URL,
  logo: abs(IMG.logoLight),
  foundingDate: COMPANY_FOUNDED,
  foundingLocation: { "@type": "Place", name: `${CITY}, Karnataka, India` },
  founder: { "@id": PERSON_ID },
  address: COMPANY_ADDRESS,
  areaServed: { "@type": "Country", name: "India" },
  description: `${COMPANY} is a platform where people buy medicine from their neighbourhood pharmacy and ${COMPANY} delivers it in minutes. Behind it: pharmacy management software, doctor e-prescriptions, delivery and distribution.`,
  sameAs: COMPANY_SAMEAS,
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: NAME,
  alternateName: [`${NAME} official website`, "ronipaul.com"],
  description: `Official website of ${NAME}, health-tech entrepreneur and founder of ${COMPANY}.`,
  publisher: { "@id": PERSON_ID },
  inLanguage: "en-IN",
};

const GRAPH = { "@context": "https://schema.org", "@graph": [WEBSITE, ORG, PERSON, PROFILE_PAGE, FAQ_PAGE, ...VIDEOS, ...IMAGES, ...ARTICLES, PLAYBOOK_LIST, NEWS_LIST] };

export default function RoniPaulPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(GRAPH) }} />
      <RoniPaulClient />
    </>
  );
}
