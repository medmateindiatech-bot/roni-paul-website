import Link from "next/link";
import { LINKEDIN, NAME, PAGE_PATH, TITLE } from "../site";

/* Shared chrome for the essay pages: slim nav + footer that point back to the profile. */
export default function NotesShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="rp-nav is-scrolled">
        <div className="rp-wrap rp-nav-in">
          <Link href={PAGE_PATH || "/"} className="rp-brand" aria-label={`${NAME}, home`}>
            <span className="rp-brand-mono"><img src="/roni-paul/favicon.svg" alt="Roni Paul monogram" width={36} height={36} /></span>
            <span className="rp-brand-name">{NAME}</span>
          </Link>
          <nav className="rp-nav-links rp-nav-links-static" aria-label="Sections">
            <Link href={`${PAGE_PATH}/notes`}>Notes</Link>
            <Link href={`${PAGE_PATH}/facts`}>Facts</Link>
            <Link href={`${PAGE_PATH}/speaking`}>Speaking</Link>
            <Link href={`${PAGE_PATH}#about`}>About</Link>
            <Link href={`${PAGE_PATH}#press`}>Press kit</Link>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="rp-nav-cta">LinkedIn ↗</a>
          </nav>
        </div>
      </header>
      <nav className="rp-notes-crumbs" aria-label="Notes navigation">
        <div className="rp-wrap">
          <Link href={PAGE_PATH || "/"}>← Profile</Link>
          <Link href={`${PAGE_PATH}/notes`}>All essays</Link>
          <Link href={`${PAGE_PATH}/facts`}>Facts</Link>
          <Link href={`${PAGE_PATH}/speaking`}>Speaking</Link>
          <Link href={`${PAGE_PATH}#press`}>Press kit</Link>
        </div>
      </nav>
      <main className="rp-notes-main">
        <div className="rp-wrap">{children}</div>
      </main>
      <footer className="rp-foot">
        <div className="rp-wrap rp-foot-in">
          <span>© 2026 {NAME} · {TITLE}</span>
          <Link href={PAGE_PATH || "/"} className="rp-foot-tag">← Back to the profile</Link>
        </div>
      </footer>
    </>
  );
}
