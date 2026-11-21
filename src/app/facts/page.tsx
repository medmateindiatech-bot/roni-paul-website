import type { Metadata } from "next";
import Link from "next/link";
import { CITE_AS, FACTS_SOURCED } from "../facts";
import NotesShell from "../notes/NotesShell";
import { NAME, PAGE_PATH, PAGE_URL, PERSON_ID, SITE_URL, UPDATED } from "../site";
import { PERSON_NODE } from "../schema";

export const metadata: Metadata = {
  title: "India's pharmacy market in numbers, sourced",
  description: "How many pharmacies India has, government hospitals, post offices, the chemists' strike, prescription rules and chemist margins, each with source and date.",
  alternates: { canonical: `${PAGE_PATH}/facts` },
  openGraph: { type: "article", url: `${PAGE_PATH}/facts`, title: "India's pharmacy market in numbers", description: "Sourced figures on India's pharmacies, with dates and sources.", images: [{ url: "/roni-paul/og/facts.jpg", width: 1200, height: 630 }] },
};

export default function FactsPage() {
  const url = `${PAGE_URL}/facts`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_NODE,
      {
        "@type": "Article", "@id": `${url}#article`, mainEntityOfPage: url,
        headline: "India's pharmacy market in numbers", description: metadata.description,
        datePublished: "2026-10-31", dateModified: UPDATED, inLanguage: "en-IN",
        author: { "@id": PERSON_ID }, publisher: { "@id": PERSON_ID },
        citation: FACTS_SOURCED.map(f => ({ "@type": "CreativeWork", name: `${f.source} (${f.asOf})`, url: f.sourceUrl })),
        about: FACTS_SOURCED.map(f => ({ "@type": "Thing", name: f.claim })),
      },
      {
        "@type": "FAQPage", "@id": `${url}#faq`,
        mainEntity: FACTS_SOURCED.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: `${f.claim}: ${f.value}. Source: ${f.source}, as of ${f.asOf}.${f.note ? " " + f.note : ""}` } })),
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: NAME, item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Facts", item: url }] },
    ],
  };
  return (
    <NotesShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <article className="rp-article rp-facts-page">
        <nav className="rp-crumbs" aria-label="Breadcrumb"><Link href={PAGE_PATH || "/"}>{NAME}</Link><span>/</span><span>Facts</span></nav>
        <header className="rp-article-head">
          <p className="rp-eyebrow">Sourced facts · updated {UPDATED}</p>
          <h1 className="rp-article-h1">India&apos;s pharmacy market in numbers</h1>
          <p className="rp-article-dek">Every figure quoted on this site, with where it comes from and when it was true. Free to cite with attribution.</p>
        </header>
        <div className="rp-facts-list">
          {FACTS_SOURCED.map(f => (
            <section key={f.id} id={f.id} className="rp-fact-card">
              <h2>{f.question}</h2>
              <p className="rp-fact-value"><b>{f.value}</b> <span>{f.claim}</span></p>
              <p className="rp-fact-source">Source: <a href={f.sourceUrl} target="_blank" rel="noopener noreferrer">{f.source}</a> · as of {f.asOf}</p>
              {f.note && <p className="rp-fact-note">{f.note}</p>}
            </section>
          ))}
        </div>
        <p className="rp-facts-related">See also: <Link href={`${PAGE_PATH}/facts/pharmacists-by-state`}>registered pharmacists per lakh people, state by state</Link>, with a downloadable table.</p>
        <aside className="rp-cite-box">
          <h2>How to cite</h2>
          <p>{CITE_AS}</p>
          <p>Corrections: email the address on the <Link href={`${PAGE_PATH || "/"}#contact`}>profile page</Link>. Figures are re-checked when the source publishes a new release.</p>
        </aside>
      </article>
    </NotesShell>
  );
}
