import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NOTES, fmt, noteBySlug } from "../../notes";
import { IMG, NAME, NAME_TITLE, PAGE_PATH, PAGE_URL, PERSON_ID, SITE_URL } from "../../site";
import NotesShell from "../NotesShell";
import { PERSON_NODE } from "../../schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return NOTES.map(n => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const n = noteBySlug(slug);
  if (!n) return {};
  const url = `${PAGE_PATH}/notes/${n.slug}`;
  return {
    title: n.seoTitle || n.title,
    description: n.seoDescription || n.dek,
    keywords: n.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: n.title,
      description: n.seoDescription || n.dek,
      publishedTime: n.date,
      authors: [PAGE_URL],
      images: [{ url: `/roni-paul/og/${n.slug}.jpg`, width: 1200, height: 630, alt: n.title }],
    },
    twitter: { card: "summary_large_image", title: n.seoTitle || n.title, description: n.seoDescription || n.dek, images: [`/roni-paul/og/${n.slug}.jpg`] },
  };
}


/* Inline markdown links: [text](url). Internal URLs render as <Link>. */
function inline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const b = part.match(/^\*\*([^*]+)\*\*$/);
    if (b) return <b key={i}>{b[1]}</b>;
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    const [, label, href] = m;
    return href.startsWith("/")
      ? <Link key={i} href={`${PAGE_PATH}${href}`}>{label}</Link>
      : <a key={i} href={href} target="_blank" rel="noopener noreferrer">{label}</a>;
  });
}
/* Pipe table: one string, rows separated by newlines, cells by " | "; first row is the header. */
function Table({ src }: { src: string }) {
  const rows = src.split("\n").map(r => r.replace(/^\|\s*/, "").split(/\s*\|\s*/));
  const [head, ...rest] = rows;
  return (
    <div className="rp-table-wrap">
      <table className="rp-table">
        <thead><tr>{head.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
        <tbody>{rest.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{inline(c)}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const n = noteBySlug(slug);
  if (!n) notFound();
  const url = `${PAGE_URL}/notes/${n.slug}`;
  const idx = NOTES.findIndex(x => x.slug === n.slug);
  const next = NOTES[(idx + 1) % NOTES.length];

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      PERSON_NODE,
      {
        "@type": "Article",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        headline: n.title,
        description: n.dek,
        abstract: n.summary.join(" "),
        datePublished: n.date,
        dateModified: n.date,
        articleSection: n.kind,
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".rp-article-h1", ".rp-article-dek"] },
        wordCount: n.body.join(" ").split(/\s+/).length,
        keywords: n.keywords.join(", "),
        image: `${SITE_URL}/roni-paul/og/${n.slug}.jpg`,
        author: { "@type": "Person", "@id": PERSON_ID, name: NAME, url: PAGE_URL },
        publisher: { "@type": "Person", "@id": PERSON_ID, name: NAME },
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: n.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: NAME, item: PAGE_URL },
          { "@type": "ListItem", position: 2, name: "Notes", item: `${PAGE_URL}/notes` },
          { "@type": "ListItem", position: 3, name: n.title, item: url },
        ],
      },
    ],
  };

  return (
    <NotesShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <article className="rp-article">
        <nav className="rp-crumbs" aria-label="Breadcrumb">
          <Link href={PAGE_PATH || "/"}>{NAME}</Link><span>/</span><Link href={`${PAGE_PATH}/notes`}>Notes</Link>
        </nav>
        <header className="rp-article-head">
          <p className="rp-eyebrow">{n.kind}</p>
          <h1 className="rp-article-h1">{n.title}</h1>
          <p className="rp-article-dek">{n.dek}</p>
          <div className="rp-byline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.headshotThumb} alt={`${NAME}, founder and CEO of MedMate`} width={44} height={44} />
            <span><b>{NAME}</b><span>{NAME_TITLE.replace(`${NAME}, `, "")} · <time dateTime={n.date}>{fmt(n.date)}</time> · {n.readMins} min read</span></span>
          </div>
        </header>
        <aside className="rp-tldr" aria-label="Summary">
          <h2>In short</h2>
          <ul>{n.summary.map((line, i) => <li key={i}>{line}</li>)}</ul>
        </aside>
        <div className="rp-article-body">
          {n.body.map((p, i) =>
            p.startsWith("### ") ? <h3 key={i}>{inline(p.slice(4))}</h3>
            : p.startsWith("## ") ? <h2 key={i}>{inline(p.slice(3))}</h2>
            : p.startsWith("> ") ? <blockquote key={i}><p>{inline(p.slice(2))}</p></blockquote>
            : p.startsWith("| ") ? <Table key={i} src={p} />
            : <p key={i}>{inline(p)}</p>
          )}
        </div>
        <section className="rp-essay-faq" aria-label="Questions this essay answers">
          <h2>Questions this essay answers</h2>
          {n.faqs.map(f => (
            <details key={f.q} className="rp-faq-item">
              <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
        <aside className="rp-author-box">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.headshotThumb} alt={`${NAME}, founder and CEO of MedMate, Bengaluru`} width={56} height={56} loading="lazy" />
          <p>
            <b>{NAME}</b> is a <Link href={PAGE_PATH || "/"}>health-tech entrepreneur from Assam, based in Bengaluru</Link>, and the founder and CEO of MedMate, the platform where people buy medicine from their neighbourhood pharmacy, delivered in minutes. <Link href={PAGE_PATH || "/"}>Read his full profile →</Link>
          </p>
        </aside>
        <footer className="rp-article-foot">
          <div className="rp-article-share">
            <span>Share</span>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(n.title + " by " + NAME)}`} target="_blank" rel="noopener noreferrer">X</a>
            <a href={`https://wa.me/?text=${encodeURIComponent(n.title + " " + url)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <Link href={`${PAGE_PATH}/notes/${next.slug}`} className="rp-article-next">
            <span className="rp-post-k">Next essay</span>
            <span className="rp-note-t">{next.title}</span>
            <span className="rp-arrow">Read →</span>
          </Link>
        </footer>
      </article>
    </NotesShell>
  );
}
