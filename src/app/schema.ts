import { DESCRIPTOR, IMG, NAME, PAGE_URL, PERSON_ID, SITE_URL, SOCIAL, TITLE } from "./site";

/* Compact Person node for secondary pages (the profile page carries the full one with the same @id). */
export const PERSON_NODE = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: NAME,
  url: PAGE_URL || SITE_URL,
  mainEntityOfPage: PAGE_URL || SITE_URL,
  disambiguatingDescription: "Health-tech entrepreneur from Assam, based in Bengaluru; founder and CEO of MedMate. Official website: ronipaul.com.",
  jobTitle: TITLE,
  description: `${NAME} is a ${DESCRIPTOR.toLowerCase()} from Assam, based in Bengaluru, and the founder and CEO of MedMate.`,
  image: `${SITE_URL}${IMG.headshot}`,
  sameAs: SOCIAL.filter(s => s.url).map(s => s.url),
};
