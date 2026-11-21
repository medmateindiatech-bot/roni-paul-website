import type { Metadata } from "next";
import Link from "next/link";
import NotesShell from "../../notes/NotesShell";
import { PERSON_NODE } from "../../schema";
import { DATA_NOTES, INDIA_PHARMACISTS, INDIA_POPULATION_2011, PHARMACISTS_BY_STATE } from "../../pharmacists";
import { NAME, PAGE_PATH, PAGE_URL, PERSON_ID, SITE_URL, UPDATED } from "../../site";

const DESC = "Registered pharmacists in every Indian state and per lakh of population, from the National Health Profile 2022 and Census 2011, with a downloadable table.";
const CSV = "/roni-paul/data/pharmacists-by-state-2021.csv";
const fmtN = (n: number) => n.toLocaleString("en-IN");

export const metadata: Metadata = {
  title: "Pharmacists per lakh people, by Indian state",
  description: DESC,
  alternates: { canonical: `${PAGE_PATH}/facts/pharmacists-by-state` },
  openGraph: { type: "article", url: `${PAGE_PATH}/facts/pharmacists-by-state`, title: "Pharmacists per lakh people, by Indian state", description: DESC, images: [{ url: "/roni-paul/og/pharmacists-by-state.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Pharmacists per lakh people, by Indian state", description: DESC, images: ["/roni-paul/og/pharmacists-by-state.jpg"] },
};

export default function PharmacistsByStatePage() {
  const url = `${PAGE_URL}/facts/pharmacists-by-state`;
  const rows = PHARMACISTS_BY_STATE;
  const top = rows[0], bottom = rows[rows.length - 1];
  const assam = rows.find(r => r.state === "Assam")!;
  const maha = rows.find(r => r.state === "Maharashtra")!;
  const indiaPerLakh = Math.round(INDIA_PHARMACISTS / INDIA_POPULATION_2011 * 100000);
  const faqs = [
    { q: "How many registered pharmacists does India have?", a: `${fmtN(INDIA_PHARMACISTS)} as on 15 December 2021, according to the Pharmacy Council of India as reported in the National Health Profile 2022. That is about ${indiaPerLakh} per lakh people on the 2011 census base.` },
    { q: "Which Indian state has the most pharmacists per person?", a: `${top.state}, at ${Math.round(top.perLakh)} registered pharmacists per lakh people. Among large states, Maharashtra leads with ${fmtN(maha.pharmacists)} registered pharmacists, ${Math.round(maha.pharmacists / INDIA_PHARMACISTS * 100)} percent of India's total.` },
    { q: "Which state has the fewest pharmacists per person?", a: `${bottom.state}, at ${Math.round(bottom.perLakh)} per lakh. Assam has ${Math.round(assam.perLakh)} per lakh, well under the national figure of ${indiaPerLakh}.` },
    { q: "Is there a count of pharmacies by state in India?", a: "Not publicly. Retail drug licences are issued by state drug controllers and the totals are not published centrally. Registered pharmacists is the closest official state-by-state measure; AIOCD puts the national chemist count at 12.40 lakh (March 2026)." },
  ];
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_NODE,
      {
        "@type": "Dataset", "@id": `${url}#dataset`, name: "Registered pharmacists by Indian state, 2021, per lakh population",
        description: DESC, url, license: "https://creativecommons.org/licenses/by/4.0/", creator: { "@id": PERSON_ID }, dateModified: UPDATED, temporalCoverage: "2021-12-15", spatialCoverage: "India",
        distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE_URL}${CSV}` }],
        isBasedOn: ["https://cbhidghs.mohfw.gov.in/", "https://censusindia.gov.in/"],
        variableMeasured: ["registered pharmacists", "population (Census 2011)", "pharmacists per lakh population"],
      },
      {
        "@type": "Article", "@id": `${url}#article`, mainEntityOfPage: url, headline: "Pharmacists per lakh people, by Indian state", description: DESC,
        datePublished: "2026-11-04", dateModified: UPDATED, inLanguage: "en-IN", author: { "@id": PERSON_ID }, publisher: { "@id": PERSON_ID },
        citation: [
          { "@type": "CreativeWork", name: "Central Bureau of Health Intelligence, National Health Profile 2022, Table 5.1.5 (pharmacists as on 15.12.2021, source Pharmacy Council of India)", url: "https://cbhidghs.mohfw.gov.in/" },
          { "@type": "CreativeWork", name: "Census of India 2011, state populations (NHP 2022, Table 1.1.2(a))", url: "https://censusindia.gov.in/" },
          { "@type": "CreativeWork", name: "AIOCD, chemists and druggists in India, 12.40 lakh, March 2026", url: "https://aiocd.org/" },
        ],
      },
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: NAME, item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Facts", item: `${PAGE_URL}/facts` }, { "@type": "ListItem", position: 3, name: "Pharmacists by state", item: url }] },
    ],
  };
  return (
    <NotesShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <article className="rp-article rp-facts-page rp-report">
        <nav className="rp-crumbs" aria-label="Breadcrumb"><Link href={PAGE_PATH || "/"}>{NAME}</Link><span>/</span><Link href={`${PAGE_PATH}/facts`}>Facts</Link><span>/</span><span>Pharmacists by state</span></nav>
        <header className="rp-article-head">
          <p className="rp-eyebrow">Sourced facts · updated {UPDATED}</p>
          <h1 className="rp-article-h1">Where India&apos;s pharmacists are</h1>
          <p className="rp-article-dek">Registered pharmacists per lakh people, state by state, from the National Health Profile 2022 and the 2011 census. Free to cite with attribution. <a href={CSV} download>Download the table (CSV)</a>.</p>
        </header>
        <aside className="rp-tldr" aria-label="In short">
          <h2>In short</h2>
          <ul>
            <li>India had {fmtN(INDIA_PHARMACISTS)} registered pharmacists on 15 December 2021, about {indiaPerLakh} per lakh people on the 2011 census base.</li>
            <li>Density ranges more than thirty-fold: {top.state} leads at {Math.round(top.perLakh)} per lakh; {bottom.state} trails at {Math.round(bottom.perLakh)}.</li>
            <li>Assam has {fmtN(assam.pharmacists)} registered pharmacists for {fmtN(assam.population)} people, {Math.round(assam.perLakh)} per lakh. The North East as a whole sits at the bottom of the table.</li>
            <li>Maharashtra alone holds {Math.round(maha.pharmacists / INDIA_PHARMACISTS * 100)} percent of India&apos;s registered pharmacists.</li>
          </ul>
        </aside>
        <div className="rp-article-body">
          <h2>Why this page, and what it is not</h2>
          <p>India has <Link href={`${PAGE_PATH}/facts#chemists-india`}>12.40 lakh chemists and druggists</Link> (AIOCD, March 2026). No public dataset says how many are in each state: retail drug licences are issued by state drug controllers and the counts are not published centrally. The closest official, state-by-state measure is the number of <b>registered pharmacists</b>, which the Pharmacy Council of India reports through the Central Bureau of Health Intelligence. Every pharmacy must have a registered pharmacist, so the register is the best public proxy for where pharmacy capacity sits. It is a proxy: a registered pharmacist may work in a hospital, a company, or not at all.</p>
          <h2>Registered pharmacists per lakh population</h2>
          <div className="rp-table-wrap">
            <table className="rp-table rp-table-num">
              <thead><tr><th>#</th><th>State / UT</th><th>Registered pharmacists (15 Dec 2021)</th><th>Population (Census 2011)</th><th>Per lakh</th></tr></thead>
              <tbody>
                {rows.map((r, i) => <tr key={r.state}><td>{i + 1}</td><td>{r.state}</td><td>{fmtN(r.pharmacists)}</td><td>{fmtN(r.population)}</td><td>{Math.round(r.perLakh)}</td></tr>)}
                <tr className="rp-table-total"><td /><td>India</td><td>{fmtN(INDIA_PHARMACISTS)}</td><td>{fmtN(INDIA_POPULATION_2011)}</td><td>{indiaPerLakh}</td></tr>
              </tbody>
            </table>
          </div>
          <p className="rp-fact-source">Notes: {DATA_NOTES} Figures are copied from the source tables without adjustment.</p>
          <h2>What this means for the neighbourhood pharmacy</h2>
          <p><b>Capacity and competition travel together.</b> The states with the most pharmacists per person (Chandigarh, Goa, Maharashtra, Puducherry, Kerala, Gujarat, Punjab, Delhi) are also where quick commerce arrived first.</p>
          <p><b>The populous north and east are thinnest.</b> Uttar Pradesh, Bihar, Jharkhand and West Bengal have the fewest pharmacists per person. That is where the neighbourhood chemist is the only medicine infrastructure, and where a platform that works for small shops matters most.</p>
          <p><b>The North East is below the national figure on every measure.</b> Distance, not demand, is the problem; see <Link href={`${PAGE_PATH}/notes/entrepreneur-from-assam`}>An entrepreneur from Assam, building for India</Link>.</p>
          <h2>Sources</h2>
          <ul className="rp-list">
            <li><a href="https://cbhidghs.mohfw.gov.in/" target="_blank" rel="noopener noreferrer">Central Bureau of Health Intelligence, National Health Profile 2022</a>, Table 5.1.5: state/UT-wise registered nurses and pharmacists; pharmacists as on 15.12.2021, source Pharmacy Council of India.</li>
            <li><a href="https://censusindia.gov.in/" target="_blank" rel="noopener noreferrer">Census of India 2011</a>, state populations, as reproduced in National Health Profile 2022, Table 1.1.2(a), Office of the Registrar General of India.</li>
            <li><a href="https://aiocd.org/" target="_blank" rel="noopener noreferrer">AIOCD</a>, chemists and druggists in India, 12.40 lakh, March 2026 (national only).</li>
          </ul>
        </div>
        <section className="rp-essay-faq" aria-label="Questions this page answers">
          <h2>Questions this page answers</h2>
          {faqs.map(f => (
            <details key={f.q} className="rp-faq-item"><summary>{f.q}<i aria-hidden="true" /></summary><p>{f.a}</p></details>
          ))}
        </section>
        <aside className="rp-cite-box">
          <h2>How to cite</h2>
          <p>Roni Paul, ronipaul.com. Pharmacists by state: {url} (data: NHP 2022 / Census 2011).</p>
        </aside>
      </article>
    </NotesShell>
  );
}
