import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NotesShell from "../notes/NotesShell";
import { PERSON_NODE } from "../schema";
import { CONTACT, IMG, NAME, PAGE_PATH, PAGE_URL, PERSON_ID, SITE_URL, UPDATED } from "../site";

const TALKS = [
  { t: "How to grow from scratch: seven rules from seven years", d: "Entrepreneurship without the mythology. Three companies since 2019: one that closed, one still running, one being built in public, and the rule each chapter taught.", f: "Colleges · Founder events · 30 to 40 min plus Q&A" },
  { t: "Why India's chemists are losing to apps, and how they win back", d: "12 lakh+ counters, one phone in every customer's hand, and the seven operational gaps between them.", f: "Keynote · 25 to 40 min" },
  { t: "The customer didn't leave the chemist. They moved.", d: "The thesis behind MedMate, told through three real shops.", f: "Talk or fireside · 20 to 30 min" },
  { t: "Founder-market fit: building the business you grew up in", d: "What a pharmacy family teaches you that a business school cannot.", f: "Founder events · 20 min" },
  { t: "Leaving medical school to build", d: "The honest version, for students deciding between the safe path and the one they want.", f: "Colleges · 20 to 30 min plus Q&A" },
  { t: "Building in public, honestly", d: "What 100+ days of posting the build every day did for recruiting, customers and discipline, and what it cost.", f: "Founder events · Podcasts" },
  { t: "Quick commerce vs the neighbourhood chemist", d: "Why medicine is not groceries, and what the 20 May 2026 chemists' bandh was really about.", f: "Panel" },
  { t: "Health-tech from Bengaluru for the rest of India", d: "Building for towns that quick commerce will never reach.", f: "Keynote · Panel" },
];
const FORMATS = ["Keynote", "Fireside", "Panel", "Podcast", "Campus talk", "Workshop for pharmacy associations"];
const PAST = [
  { n: "College talks across Bengaluru", w: "2026", d: "Campus sessions on leaving medicine to build and on the neighbourhood pharmacy; photos on the profile page." },
  { n: "India Pharma Channel", w: "2026", d: "Conversation with the President of the Bangalore District Chemists & Druggists Association." },
  { n: "The ₹200 Crore Challenge", w: "Daily since 17 July 2026", d: "A Reel a day for 730 days, on Instagram @the_roni_paul." },
];
const FAQS = [
  { q: "What does Roni Paul speak about?", a: "Entrepreneurship and how to grow a company from scratch, from his own experience of founding three since 2019. Also the neighbourhood pharmacy and why it is losing to apps, quick commerce versus the chemist, founder-market fit, leaving medical school to build companies, building in public, and health-tech from Bengaluru for the rest of India." },
  { q: "Does Roni Paul speak at colleges?", a: "Yes. Campus talks of 20 to 30 minutes plus Q&A, typically on how to grow from scratch, leaving medicine to build, and building a company in public. He has spoken at colleges across Bengaluru in 2026." },
  { q: "How do I book Roni Paul as a speaker?", a: `Email ${CONTACT.email} with the event name, date, city, audience and format. Replies within two working days. Slides and a talk outline are sent a week before the event; an approved bio and headshot are in the press kit.` },
];
const DESC = "Book Roni Paul, health-tech entrepreneur and MedMate founder, for talks on entrepreneurship, growing from scratch, pharmacy retail and building in public.";

export const metadata: Metadata = {
  title: "Invite Roni Paul to speak: health-tech talks",
  description: DESC,
  alternates: { canonical: `${PAGE_PATH}/speaking` },
  openGraph: { type: "website", url: `${PAGE_PATH}/speaking`, title: "Invite Roni Paul to speak", description: DESC, images: [{ url: "/roni-paul/og/speaking.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Invite Roni Paul to speak", description: DESC, images: ["/roni-paul/og/speaking.jpg"] },
};

export default function SpeakingPage() {
  const url = `${PAGE_URL}/speaking`;
  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_NODE,
      {
        "@type": "WebPage", "@id": `${url}#page`, url, name: "Invite Roni Paul to speak", description: DESC, inLanguage: "en-IN", dateModified: UPDATED,
        about: { "@id": PERSON_ID }, isPartOf: { "@id": `${SITE_URL}#website` },
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".rp-article-dek", ".rp-tldr"] },
        mainEntity: { "@type": "ItemList", name: "Talks by Roni Paul", itemListElement: TALKS.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.t, description: t.d })) },
      },
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: NAME, item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Speaking", item: url }] },
    ],
  };
  return (
    <NotesShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <article className="rp-article rp-speaking">
        <nav className="rp-crumbs" aria-label="Breadcrumb"><Link href={PAGE_PATH || "/"}>{NAME}</Link><span>/</span><span>Speaking</span></nav>
        <header className="rp-article-head">
          <p className="rp-eyebrow">Speaking · {NAME}</p>
          <h1 className="rp-article-h1">Invite Roni Paul to speak</h1>
          <p className="rp-article-dek">Health-tech entrepreneur from Assam, based in Bengaluru. Founder and CEO of MedMate. Plain-spoken talks on entrepreneurship and how to grow from scratch, the neighbourhood pharmacy, quick commerce, and building a company in public. Colleges, founder events, pharmacy associations, podcasts.</p>
          <div className="rp-speaking-cta">
            <a href={`mailto:${CONTACT.email}?subject=Speaking%20request%20for%20Roni%20Paul`} className="rp-btn rp-btn-gold">Email to book</a>
            <Link href={`${PAGE_PATH}#press`} className="rp-btn rp-btn-ghost">Press kit</Link>
          </div>
        </header>
        <aside className="rp-tldr" aria-label="Who he is on stage">
          <h2>Who he is on stage</h2>
          <ul>
            <li>Grew up behind a pharmacy counter in Assam, studied medicine, left medical school to build companies. MedMate, incorporated in Bengaluru in July 2026, is his third.</li>
            <li>Building MedMate in public through the ₹200 Crore Challenge: a Reel a day for 730 days.</li>
            <li>Speaks on entrepreneurship from his own record, not from theory: the <Link href={`${PAGE_PATH}/notes/how-to-grow-from-scratch`}>seven rules for growing from scratch</Link> each come with the chapter that taught them.</li>
            <li>Speaks the way he writes: from the counter, with numbers that carry a source.</li>
          </ul>
        </aside>
        <div className="rp-article-body">
          <h2>Talks</h2>
          <p>Pick one, or ask for a mix.</p>
          <ol className="rp-talks">
            {TALKS.map((t, i) => (
              <li key={t.t}>
                <span className="rp-talk-n">{String(i + 1).padStart(2, "0")}</span>
                <div><h3>{t.t}</h3><p>{t.d}</p><span className="rp-talk-f">{t.f}</span></div>
              </li>
            ))}
          </ol>
          <h2>Formats</h2>
          <ul className="rp-formats">{FORMATS.map(f => <li key={f}>{f}</li>)}</ul>
          <h2>Past appearances</h2>
          <ul className="rp-past">
            {PAST.map(p => <li key={p.n}><b>{p.n}</b> <span className="rp-talk-f">{p.w}</span><p>{p.d}</p></li>)}
          </ul>
          <div className="rp-speaking-photos">
            <Image src="/roni-paul/gallery/roni-paul-speaking-to-students-audience.jpg" alt="Roni Paul addressing a hall of students at a college talk in Bengaluru" width={2000} height={951} sizes="(max-width: 768px) 100vw, 720px" loading="eager" />
            <Image src="/roni-paul/gallery/roni-paul-presenting-with-headset-mic.jpg" alt="Roni Paul, founder of MedMate, presenting with a headset mic, slides on screen behind him" width={1080} height={1350} sizes="(max-width: 768px) 100vw, 360px" loading="eager" />
          </div>
          <h2>What organisers get</h2>
          <ul className="rp-list">
            <li>Talk outline and slides a week before the event</li>
            <li>Approved bio in three lengths and a print-ready headshot, in the <Link href={`${PAGE_PATH}#press`}>press kit</Link></li>
            <li>A plain-spoken speaker who answers the hard questions</li>
          </ul>
          <h2>Booking</h2>
          <p>Email <a href={`mailto:${CONTACT.email}?subject=Speaking%20request%20for%20Roni%20Paul`}>{CONTACT.email}</a> with the event name, date, city, audience and format. Replies within two working days.</p>
        </div>
        <section className="rp-essay-faq" aria-label="Questions organisers ask">
          <h2>Questions organisers ask</h2>
          {FAQS.map(f => (
            <details key={f.q} className="rp-faq-item"><summary>{f.q}<i aria-hidden="true" /></summary><p>{f.a}</p></details>
          ))}
        </section>
        <div className="rp-author-box">
          <Image src={IMG.headshot} alt={`${NAME}, founder and CEO of MedMate, Bengaluru`} width={56} height={56} />
          <p><b>{NAME}</b> is a <Link href={PAGE_PATH || "/"}>health-tech entrepreneur from Assam, based in Bengaluru</Link>, and the founder and CEO of MedMate, the platform where people buy medicine from their neighbourhood pharmacy, delivered in minutes. <Link href={`${PAGE_PATH}/notes`}>Read the essays →</Link></p>
        </div>
      </article>
    </NotesShell>
  );
}
