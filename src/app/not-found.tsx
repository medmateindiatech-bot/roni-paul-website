import type { Metadata } from "next";
import Link from "next/link";
import { NOTES, fmt } from "./notes";
import { NAME, PAGE_PATH } from "./site";
import NotesShell from "./notes/NotesShell";

export const metadata: Metadata = {
  title: "Page not found",
  description: `That page is not on ${NAME}'s site. The profile, essays, facts and speaking page are one click away.`,
  robots: { index: false, follow: true },
};

/* Custom 404 in the site's own chrome: a press mention with a bad link still lands somewhere useful. */
export default function NotFound() {
  const latest = [...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);
  return (
    <NotesShell>
      {/* flag read by the analytics script so 404 hits show up as a GA event */}
      <meta name="rp-404" content="1" />
      <header className="rp-notes-head rp-404">
        <p className="rp-eyebrow">404</p>
        <h1 className="rp-h2 rp-notes-h1">That page is not here.</h1>
        <p className="rp-sec-sub">The link may be old or mistyped. Everything on this site is one click away: who {NAME} is, the essays from building MedMate, the facts page, and how to book him to speak.</p>
        <div className="rp-404-actions">
          <Link href={PAGE_PATH || "/"} className="rp-btn rp-btn-dark">Back to the profile</Link>
          <Link href={`${PAGE_PATH}/notes`} className="rp-btn rp-btn-ghost">All essays</Link>
          <Link href={`${PAGE_PATH}/facts`} className="rp-btn rp-btn-ghost">Facts</Link>
          <Link href={`${PAGE_PATH}/speaking`} className="rp-btn rp-btn-ghost">Speaking</Link>
        </div>
      </header>
      <p className="rp-eyebrow rp-404-sub">Latest essays</p>
      <ol className="rp-notes-list">
        {latest.map(n => (
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
