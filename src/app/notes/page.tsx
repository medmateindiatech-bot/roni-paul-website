import type { Metadata } from "next";
import Link from "next/link";
import { NOTES, fmt } from "../notes";
import { NAME, PAGE_PATH, PAGE_URL, PERSON_ID, SITE_URL, UPDATED } from "../site";
import { PERSON_NODE } from "../schema";
import NotesShell from "./NotesShell";

export const metadata: Metadata = {
  title: "Notes from the build: essays by a founder",
  description: `Essays by ${NAME}, founder of MedMate: what pharmacy owners say behind the counter, why chemists lose to apps, and building health-tech in Bengaluru.`,
  alternates: { canonical: `${PAGE_PATH}/notes` },
  openGraph: { type: "website", url: `${PAGE_PATH}/notes`, title: `Notes from the build, by ${NAME}` },
};

export default function NotesIndex() {
  const sorted = [...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1));
  const url = `${PAGE_URL}/notes`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_NODE,
      {
        "@type": "CollectionPage", "@id": `${url}#page`, url, name: "Notes from the build: founder essays",
        description: metadata.description, inLanguage: "en-IN", dateModified: UPDATED,
        author: { "@id": PERSON_ID }, isPartOf: { "@id": `${SITE_URL}#website` },
        hasPart: sorted.map(n => ({ "@type": "Article", "@id": `${PAGE_URL}/notes/${n.slug}#article`, headline: n.title, url: `${PAGE_URL}/notes/${n.slug}`, datePublished: n.date, author: { "@id": PERSON_ID } })),
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: NAME, item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Notes", item: url }] },
    ],
  };
  return (
    <NotesShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <header className="rp-notes-head">
        <p className="rp-eyebrow">Essays</p>
        <h1 className="rp-h2 rp-notes-h1">Notes from the build</h1>
        <p className="rp-sec-sub">What pharmacy owners actually say when you sit behind their counter, what it costs to put riders on the road, and the numbers as they come in.</p>
        <div className="rp-notes-intro">
          <p>These are working notes from building MedMate, written by {NAME}, a health-tech entrepreneur from Assam, based in Bengaluru. Each essay is tagged by the lens it takes: <b>Insider</b> for what the pharmacy trade knows and rarely says out loud, <b>Builder</b> for how the platform is actually put together, <b>Visionary</b> for where neighbourhood retail is heading, and <b>Human</b> for the decisions behind the company. Every number quoted here carries a source and a date on the <Link href={`${PAGE_PATH}/facts`}>Facts page</Link>. New essays are published here first, then on <a href="https://www.linkedin.com/in/the-roni-paul" target="_blank" rel="noopener noreferrer">LinkedIn</a>. Updated <time dateTime={UPDATED}>{UPDATED}</time>.</p>
          <p className="rp-notes-start">New here? Start with <Link href={`${PAGE_PATH}/notes/the-customer-who-moved`}>The customer who moved</Link>, then <Link href={`${PAGE_PATH}/notes/twelve-lakh-counters`}>Twelve lakh counters</Link>.</p>
        </div>
      </header>
      <ol className="rp-notes-list">
        {sorted.map(n => (
          <li key={n.slug}>
            <Link href={`${PAGE_PATH}/notes/${n.slug}`} className="rp-note-row">
              <span className="rp-note-meta">
                <span className="rp-post-k">{n.kind}</span>
                <time dateTime={n.date}>{fmt(n.date)}</time>
                <span>{n.readMins} min read</span>
              </span>
              <h2 className="rp-note-t">{n.title}</h2>
              <p className="rp-note-d">{n.dek}</p>
              <span className="rp-arrow">Read →</span>
            </Link>
          </li>
        ))}
      </ol>
    </NotesShell>
  );
}
