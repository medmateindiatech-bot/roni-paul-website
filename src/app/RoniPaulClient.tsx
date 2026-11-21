"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { FAQ } from "./faq";
import { BANNER, NEWS, PHOTOS, PHOTO_LICENCE, ROLES, TALKS, TICKER, youtubeId } from "./media";
import { NOTES, fmt } from "./notes";
import { PLAYBOOK, PLAYBOOK_FOR, PLAYBOOK_SLUG, PLAYBOOK_SUB } from "./playbook";
import { CONTACT, IMG, INSTAGRAM, LINKEDIN, MEDMATE_URL, NAME_TITLE, PAGE_PATH, SOCIAL, UPDATED } from "./site";


const BIOS = {
  oneLine:
    "Roni Paul is a health-tech entrepreneur from Assam, based in Bengaluru, and the founder and CEO of MedMate, the platform where people buy medicine from their neighbourhood pharmacy, delivered in minutes. It is his third company since 2019.",
  short:
    "Roni Paul is a health-tech, med-tech and healthcare entrepreneur from Assam, based in Bengaluru, and the founder and CEO of MedMate, a platform where India's neighbourhood pharmacies sell medicine online and MedMate delivers it in minutes. Raised in a family that runs a pharmacy, a drug-distribution business and a diagnostic centre, he studied medicine abroad and left medical school to build companies. MedMate is his third since 2019.",
  long:
    "Roni Paul is a health-tech, med-tech and healthcare entrepreneur from Assam, based in Bengaluru, and the founder and CEO of MedMate, the platform where people buy medicine from their neighbourhood pharmacy and MedMate delivers it in minutes.\n\nHe grew up inside the medicine business. His father and uncle run a pharmacy, a drug-distribution operation and a diagnostic centre, and from childhood he watched how a chemist buys, stocks, prices and sells, and where the money leaks. He went abroad to study medicine and, around 2019, left medical school to build companies instead. His first was a hospitality business launched into Covid, an industry the pandemic then took apart twice. He moved to Bengaluru and joined a healthcare startup as Chief Operating Officer, working with hospitals and as a partner in the business, then founded a media agency that he continues to run.\n\nMedMate is his third company, and the one he has been preparing for his whole life. India's neighbourhood pharmacies are losing customers to apps that will never know their names. Not because the shops are worse, but because they have no software and no delivery. MedMate gives them both: pharmacy management software, doctor e-prescriptions, delivery and distribution, on one platform.\n\nHe writes and speaks on entrepreneurship and how to grow a company from scratch, drawing on his own experience, and on pharmacy retail, quick commerce, founder-market fit and building health-tech from Bengaluru for the rest of India.",
};

const STATS = [
  { n: "3", l: "companies founded", s: "since 2019" },
  { n: "7", l: "years as a founder", s: "one lifelong business" },
  { n: "Minutes", l: "delivery time", s: "from the chemist next door" },
  { n: "12 lakh+", l: "chemists in India", s: "the shops MedMate is built for" },
  { n: "1", l: "platform", s: "software · e-prescription · delivery · distribution" },
];

const JOURNEY = [
  {
    k: "The beginning",
    t: "Raised behind the counter, in Assam",
    d: "Grows up in Assam, in a family that runs a pharmacy, a drug-distribution business and a diagnostic centre, run by his father and uncle. The family business is the first classroom: how a chemist buys, stocks, prices and sells, and what a register that will not balance does to a household.",
  },
  {
    k: "Medical school",
    t: "Studies medicine abroad",
    d: "Learns clinical medicine and keeps noticing the same thing: what fails patients is rarely the medicine. It is everything around it, the access, the wait, the systems people fight through before care reaches them.",
  },
  {
    k: "2019",
    t: "Leaves medical school to build",
    d: "Chooses building over a degree. The decision that everything since has been built on.",
  },
  {
    k: "Company one",
    t: "A first company, launched into the pandemic",
    d: "Starts a hospitality business as Covid arrives. It grows fast in its first year; the second wave takes the industry apart and the company closes. The lessons stay.",
  },
  {
    k: "Bengaluru",
    t: "Chief Operating Officer, healthcare startup",
    d: "Moves to Bengaluru and joins a healthcare startup as COO, working with hospitals and as a partner in the business. Sees how technology companies actually ship, hire and earn trust at scale.",
  },
  {
    k: "Company two",
    t: "A media agency, built from scratch",
    d: "Founds a media and film agency and learns the other half of the craft: how to tell a story people act on. He still runs it.",
  },
  {
    k: "2026",
    t: "MedMate",
    d: "Incorporates Medmate India Technology Private Limited and starts the business he has known his whole life. The first months are spent listening: sitting with Bengaluru's chemists, including a conversation with the President of the Bangalore District Chemists & Druggists Association, to hear the ground reality before building.",
    now: true,
  },
];

const CAPABILITIES = [
  { k: "Software", t: "Pharmacy management software", d: "Billing, live stock and expiry, and an online store the shop owns. The chemist's whole counter, in one place." },
  { k: "Doctors", t: "Doctor e-prescription", d: "Digital prescriptions that flow straight from the clinic to the pharmacy, so the order is right before it is packed." },
  { k: "Delivery", t: "Delivery in minutes", d: "A customer orders from the chemist next door and a MedMate rider brings it home. The shop keeps the customer." },
  { k: "Distribution", t: "Distribution", d: "Stock moves from distributor to shop on the same platform, so the pharmacy is never the one left holding the gap." },
];

const BELIEFS = [
  {
    q: "The customer didn't leave the chemist. They moved.",
    d: "They still trust the shop that has known their family for twenty years. They just stopped walking to it. Give that shop an app and a rider, and the trust comes back to the counter.",
  },
  {
    q: "It's not a discipline problem. It's a tooling problem.",
    d: "Pharmacies lose margin to expiry, dead stock and guesswork ordering. Not because owners are careless, but because they are running today's volumes on yesterday's systems.",
  },
  {
    q: "Namma means ours.",
    d: "The neighbourhood pharmacy is infrastructure. Quick-commerce giants can buy attention; they cannot buy thirty years of trust. Our job is to make sure that trust has software behind it.",
  },
  {
    q: "Health-tech should be built from behind the counter.",
    d: "Most health-tech is built for the pharmacy from the outside. I grew up inside one. The best products in this space will come from people who have felt the register not balance.",
  },
];

const TOPICS = [
  "Entrepreneurship: how to grow from scratch, from his own experience",
  "Why India's pharmacies are losing to apps, and how they win back",
  "Quick commerce vs. the neighbourhood chemist",
  "Founder-market fit: building the business you grew up in",
  "Leaving medical school to build companies",
  "Health-tech from Bengaluru for the rest of India",
  "Digital prescriptions, e-pharmacy rules and the Indian clinic",
  "Building in public: a founder's first 100 days",
];


const FACTS: [string, string][] = [
  ["Name", "Roni Paul (spelled R-O-N-I)"],
  ["Official website", "ronipaul.com"],
  ["Title", "Founder & CEO, MedMate"],
  ["Company (legal)", "Medmate India Technology Private Limited"],
  ["From", "Assam, India"],
  ["Based in", CONTACT.location],
  ["Descriptor", "Health-tech entrepreneur (use this phrase; 'serial entrepreneur' only as a secondary)"],
  ["Background", "Pharmacy & distribution family · medical-school background · serial founder"],
  ["Companies", "Three founded since 2019; MedMate is the third"],
  ["Sectors", "Health-tech · pharmacy retail · quick commerce · healthcare SaaS"],
  ["Speaks on", "Entrepreneurship and growing from scratch · pharmacy retail · quick commerce · building in public"],
  ["Available for", "Podcasts · panels · guest columns · campus talks · press comment"],
];

/* ---------- small helpers ---------- */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rp-reveal"));
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={"rp-copy" + (ok ? " is-ok" : "")}
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600); } catch { /* ignore */ }
      }}
      aria-label={label}
    >
      {ok ? "Copied" : label}
    </button>
  );
}

/* Rotating descriptor in the hero kicker. */
function RotatingRole() {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setOut(true);
      setTimeout(() => { setI(v => (v + 1) % ROLES.length); setOut(false); }, 320);
    }, 2400);
    return () => clearInterval(t);
  }, []);
  return <span className={"rp-role" + (out ? " is-out" : "")} aria-live="polite">{ROLES[i]}</span>;
}

/* Counts a stat up from zero the first time it scrolls into view. Keeps prefix/suffix (₹, Cr) and Indian grouping. */
function StatNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [txt, setTxt] = useState(value);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const m = value.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!m) return;
    const [, pre, num, suf] = m;
    const target = parseInt(num.replace(/,/g, ""), 10);
    const grouped = num.includes(",");
    const fmt = (n: number) => (grouped ? n.toLocaleString("en-IN") : String(n));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(); const dur = 1400;
      const tick = (t: number) => {
        const k = Math.max(0, Math.min(1, (t - t0) / dur)); const e = 1 - Math.pow(1 - k, 3);
        setTxt(pre + fmt(Math.round(target * e)) + suf);
        if (k < 1) requestAnimationFrame(tick);
      };
      setTxt(pre + fmt(0) + suf);
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref} className="rp-stat-n">{txt}</span>;
}

/* 2-second behind-the-scenes loop over the banner photo. Muted, inline, no controls; hidden for reduced-motion users. */
function BannerLoop() {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [wide, setWide] = useState(false);
  /* Phones get the photo only: no 0.9 MB loop, no poster download. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setWide(mq.matches);
    sync(); mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tryPlay = () => v.play().then(() => setOn(true)).catch(() => {});
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) tryPlay(); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, [wide]);
  const vid = BANNER.video!;
  if (!wide) return null;
  return (
    <video ref={ref} className={"rp-banner-video" + (on ? " is-on" : "")} muted loop playsInline preload="none" width={vid.w} height={vid.h} disablePictureInPicture>
      {vid.webm && <source src={vid.webm} type="video/webm" />}
      <source src={vid.mp4} type="video/mp4" />
    </video>
  );
}

/* Endless quote ticker. */
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="rp-ticker" aria-hidden="true">
      <div className="rp-ticker-track">
        {items.map((t, i) => (
          <span key={i} className="rp-ticker-item"><i className="rp-ticker-dot" />{t}</span>
        ))}
      </div>
    </div>
  );
}

/* Talks: featured click-to-play YouTube theatre + playlist. */
function TalksSection() {
  const [active, setActive] = useState(() => Math.max(0, TALKS.findIndex(t => youtubeId(t.url))));
  const [playing, setPlaying] = useState(false);
  const talk = TALKS[active];
  const id = talk ? youtubeId(talk.url) : null;
  const pick = (i: number) => { setActive(i); setPlaying(false); };
  const liveCount = TALKS.filter(t => youtubeId(t.url)).length;

  return (
    <section id="talks" className="rp-sec rp-sec-dark rp-talks">
      <div className="rp-wrap">
        <div className="rp-sec-head rp-reveal">
          <p className="rp-eyebrow">{num("talks")} · On stage &amp; on camera</p>
          <h2 className="rp-h2">Watch Roni speak</h2>
          <p className="rp-sec-sub">Keynotes, panels, podcasts and the founder&apos;s own build-in-public series. Plain-spoken, from behind the counter.</p>
        </div>

        <div className="rp-theatre rp-reveal">
          <div className="rp-screen">
            {id && playing ? (
              <iframe
                className="rp-screen-frame"
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
                title={talk.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : id ? (
              <button type="button" className="rp-screen-poster" onClick={() => setPlaying(true)} aria-label={`Play: ${talk.title}`}>
                <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={`${talk.title}: video thumbnail`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }} />
                <span className="rp-play"><svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>
                <span className="rp-screen-cap"><b>{talk.title}</b><span>{talk.venue}{talk.year ? ` · ${talk.year}` : ""}</span></span>
              </button>
            ) : (
              <div className="rp-screen-empty">
                <span className="rp-screen-empty-k">{talk ? talk.kind : "Talks"} · recording coming soon</span>
                <p className="rp-screen-empty-q">&ldquo;{talk ? talk.title : "Watch this space."}&rdquo;</p>
                <p className="rp-screen-empty-d">
                  {liveCount === 0
                    ? "The first recordings go live here as talks are published. Want Roni on your stage or podcast first?"
                    : "This one isn't online yet. Pick another from the list, or bring Roni to your stage."}
                </p>
                <a href={`mailto:${CONTACT.email}?subject=Speaking%20request%20for%20Roni%20Paul`} className="rp-btn rp-btn-gold">Invite Roni to speak</a>
              </div>
            )}
          </div>

          {talk?.transcript && (
            <details className="rp-transcript">
              <summary>Transcript</summary>
              <p>{talk.transcript}</p>
            </details>
          )}

          <ol className="rp-playlist" aria-label="Talks">
            {TALKS.map((t, i) => {
              const live = !!youtubeId(t.url);
              return (
                <li key={t.title}>
                  <button type="button" className={"rp-pl-item" + (i === active ? " is-active" : "") + (live ? "" : " is-soon")} onClick={() => pick(i)}>
                    <span className="rp-pl-icon" aria-hidden="true">
                      {live ? <svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5v14l11-7z" fill="currentColor" /></svg> : <span className="rp-pl-dot" />}
                    </span>
                    <span className="rp-pl-body">
                      <span className="rp-pl-k">{t.kind}{t.year ? ` · ${t.year}` : ""}</span>
                      <span className="rp-pl-t">{t.title}</span>
                      <span className="rp-pl-v">{t.venue}</span>
                    </span>
                    <span className={"rp-pl-tag" + (live ? " is-live" : "")}>{live ? "Watch" : "Soon"}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* Gallery with lightbox. */
function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const nudge = (d: number) => strip.current?.scrollBy({ left: d * Math.min(640, strip.current.clientWidth * 0.8), behavior: "smooth" });
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen(v => (v === null ? v : (v + d + PHOTOS.length) % PHOTOS.length)), []);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, close, step]);

  return (
    <section id="gallery" className="rp-sec rp-gallery-sec">
      <div className="rp-wrap">
        <div className="rp-sec-head rp-reveal rp-gallery-head">
          <div className="rp-gallery-title">
            <div>
              <p className="rp-eyebrow">{num("gallery")} · In frame</p>
              <h2 className="rp-h2">Photos</h2>
            </div>
            <div className="rp-strip-nav">
              <button type="button" aria-label="Scroll photos left" onClick={() => nudge(-1)}>‹</button>
              <button type="button" aria-label="Scroll photos right" onClick={() => nudge(1)}>›</button>
            </div>
          </div>
          <p className="rp-sec-sub rp-gallery-sub">Press-usable photographs. Tap any image to view it large; download from the press kit.</p>
        </div>
      </div>
      <div className="rp-strip-wrap">
        <div className="rp-gallery" ref={strip}>
          {PHOTOS.map((ph, i) => (
            <button key={ph.src} type="button" className={`rp-tile is-${ph.ratio} rp-reveal`} style={{ transitionDelay: `${i * 50}ms`, ...(ph.ratio === "natural" ? { width: `calc(var(--tile-h) * ${(ph.w / ph.h).toFixed(4)})` } : {}) }} onClick={() => setOpen(i)} aria-label={`Open photo: ${ph.alt}`}>
              <Image src={ph.src} alt={ph.alt} width={ph.w} height={ph.h} sizes="(max-width: 768px) 70vw, 720px" />
              <span className="rp-tile-cap">{ph.cap}</span>
            </button>
          ))}
          <span className="rp-strip-end" aria-hidden="true" />
        </div>
      </div>

      {open !== null && (
        <div
          className="rp-lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => { if (touchX.current === null) return; const dx = e.changedTouches[0].clientX - touchX.current; touchX.current = null; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); }}
        >
          <button type="button" className="rp-lb-close" aria-label="Close" onClick={close}>×</button>
          <button type="button" className="rp-lb-nav is-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
          <figure className="rp-lb-fig" onClick={(e) => e.stopPropagation()}>
            <img src={PHOTOS[open].src} alt={PHOTOS[open].alt} />
            <figcaption>
              <span className="rp-lb-title"><b>{PHOTOS[open].cap}</b><span>{open + 1} / {PHOTOS.length}</span></span>
              <span className="rp-lb-alt">{PHOTOS[open].alt}</span>
            </figcaption>
          </figure>
          <button type="button" className="rp-lb-nav is-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
          <span className="rp-lb-hint" aria-hidden="true">Swipe · ← →</span>
        </div>
      )}
    </section>
  );
}

/* "How to grow from scratch": seven rules, each tied to the chapter that taught it.
   Tabs on desktop, numbered steps on phones; every panel stays in the HTML so it is indexable. */
function PlaybookSection() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const total = PLAYBOOK.length;
  const go = useCallback((n: number, focus = false) => {
    const k = (n + total) % total;
    setI(k);
    if (focus) tabs.current[k]?.focus();
    try { (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "playbook_rule", { rule: k + 1 }); } catch { /* ignore */ }
  }, [total]);
  const onKey = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); go(i + 1, true); }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); go(i - 1, true); }
    else if (e.key === "Home") { e.preventDefault(); go(0, true); }
    else if (e.key === "End") { e.preventDefault(); go(total - 1, true); }
  };
  const two = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="scratch" className="rp-sec rp-sec-cream rp-pb">
      <div className="rp-wrap">
        <div className="rp-sec-head rp-reveal rp-pb-head">
          <div>
            <p className="rp-eyebrow">{num("scratch")} · On entrepreneurship</p>
            <h2 className="rp-h2">How to grow <em>from scratch</em></h2>
          </div>
          <div className="rp-pb-intro">
            <p className="rp-sec-sub">{PLAYBOOK_SUB}</p>
            <p className="rp-pb-tally"><b>7</b> years <i aria-hidden="true" /> <b>3</b> companies <i aria-hidden="true" /> <b>7</b> rules</p>
          </div>
        </div>

        <div className="rp-pb-grid rp-reveal">
          <div className="rp-pb-rail" role="tablist" aria-label="Seven rules for growing from scratch" onKeyDown={onKey}>
            {PLAYBOOK.map((r, k) => (
              <button
                key={r.rule} type="button" role="tab" id={`pb-tab-${k}`} ref={(el) => { tabs.current[k] = el; }}
                aria-selected={k === i} aria-controls={`pb-panel-${k}`} tabIndex={k === i ? 0 : -1}
                className={"rp-pb-tab" + (k === i ? " is-active" : "") + (k < i ? " is-done" : "")}
                onClick={() => go(k)}
              >
                <span className="rp-pb-n">{two(k + 1)}</span>
                <span className="rp-pb-tt"><b>{r.rule}</b><span>{r.chapter}</span></span>
              </button>
            ))}
          </div>

          <div
            className="rp-pb-stage"
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => { if (touchX.current === null) return; const dx = e.changedTouches[0].clientX - touchX.current; touchX.current = null; if (Math.abs(dx) > 56) go(dx < 0 ? i + 1 : i - 1); }}
          >
            {PLAYBOOK.map((r, k) => (
              <article key={r.rule} role="tabpanel" id={`pb-panel-${k}`} aria-labelledby={`pb-tab-${k}`} hidden={k !== i} className="rp-pb-panel">
                <span className="rp-pb-ghost" aria-hidden="true">{two(k + 1)}</span>
                <p className="rp-pb-chapter"><i aria-hidden="true" />{r.chapter}<span>{r.when}</span></p>
                <h3 className="rp-pb-rule">{r.rule}</h3>
                <p className="rp-pb-story">{r.story}</p>
                <blockquote className="rp-pb-quote">
                  <p>&ldquo;{r.lesson}&rdquo;</p>
                  <cite>Roni Paul</cite>
                </blockquote>
                <div className="rp-pb-try">
                  <span>Try this week</span>
                  <p>{r.tryIt}</p>
                </div>
              </article>
            ))}
            <div className="rp-pb-foot">
              <span className="rp-pb-pos" aria-live="polite">Rule {i + 1} of {total}</span>
              <span className="rp-pb-bar" aria-hidden="true"><i style={{ transform: `scaleX(${(i + 1) / total})` }} /></span>
              <span className="rp-pb-arrows">
                <button type="button" aria-label="Previous rule" onClick={() => go(i - 1)}>‹</button>
                <button type="button" aria-label="Next rule" onClick={() => go(i + 1)}>›</button>
              </span>
            </div>
          </div>
        </div>

        <div className="rp-pb-cta rp-reveal">
          <div className="rp-pb-for">
            <span>Made for</span>
            <ul>{PLAYBOOK_FOR.map(f => <li key={f}>{f}</li>)}</ul>
          </div>
          <div className="rp-pb-btns">
            <Link href={`${PAGE_PATH}/notes/${PLAYBOOK_SLUG}`} className="rp-btn rp-btn-gold">Read the full playbook →</Link>
            <Link href="/speaking" className="rp-btn rp-btn-ghost">Bring this talk to your stage</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Sections that only appear once they have real content. */
const SHOW_TALKS = TALKS.some(t => youtubeId(t.url));
const SHOW_NEWS = NEWS.length > 0;
const SECTION_ORDER = ["about", "journey", "scratch", "medmate", ...(SHOW_TALKS ? ["talks"] : []), "gallery", "pov", "speaking", "writing", ...(SHOW_NEWS ? ["news"] : []), "press", "faq", "contact"];
const num = (id: string) => String(SECTION_ORDER.indexOf(id) + 1).padStart(2, "0");

const NAV = [
  ["#about", "About"],
  ["#journey", "Journey"],
  ["#scratch", "Playbook"],
  ["#medmate", "MedMate"],
  ...(SHOW_TALKS ? [["#talks", "Talks"]] : []),
  ["#gallery", "Photos"],
  ["#writing", "Essays"],
  ["#press", "Press kit"],
];

export default function RoniPaulClient() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy: highlight the nav link for the section nearest the top third of the viewport. */
  useEffect(() => {
    const ids = NAV.map(([h]) => h.slice(1));
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis.length) setActive("#" + vis[0].target.id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ------------------------------------------------ NAV */}
      <header className={"rp-nav" + (scrolled ? " is-scrolled" : "")}>
        <div className="rp-wrap rp-nav-in">
          <a href="#top" className="rp-brand" aria-label="Roni Paul, home">
            <span className="rp-brand-mono"><img src="/roni-paul/favicon.svg" alt="Roni Paul monogram" width={36} height={36} /></span>
            <span className="rp-brand-name">Roni Paul</span>
          </a>
          <nav className={"rp-nav-links" + (menu ? " is-open" : "")} aria-label="Sections">
            {NAV.map(([h, l]) => (
              <a key={h} href={h} className={active === h ? "is-active" : undefined} aria-current={active === h ? "location" : undefined} onClick={() => setMenu(false)}>{l}</a>
            ))}
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="rp-nav-cta" onClick={() => setMenu(false)}>
              LinkedIn ↗
            </a>
          </nav>
          <button type="button" className="rp-burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(v => !v)}>
            <span /><span />
          </button>
        </div>
        <span className="rp-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>
      {menu && <button type="button" className="rp-scrim" aria-label="Close menu" onClick={() => setMenu(false)} />}

      <main id="top">
        {/* ------------------------------------------------ HERO */}
        <section className="rp-hero" ref={heroRef}>
          <div className="rp-wrap rp-hero-grid">
            <div className="rp-hero-copy">
              <p className="rp-kicker"><RotatingRole /><span className="rp-kicker-sep">·</span>Bengaluru</p>
              <h1 className="rp-h1">Roni Paul</h1>
              <p className="rp-hero-lede">
                The platform where India buys medicine from <em>its neighbourhood pharmacy,</em> delivered in minutes.
              </p>
              <p className="rp-hero-sub">
                Raised in a pharmacy family. Studied medicine. Seven years and three companies later,
                building the business he has known his whole life.
              </p>
              <p className="rp-hero-summary">
                Roni Paul is a health-tech and healthcare entrepreneur from Assam, based in Bengaluru, and the founder &amp; CEO of MedMate.
              </p>
              <div className="rp-cta-row">
                <a href="#press" className="rp-btn rp-btn-dark">Press kit</a>
                {SHOW_TALKS
                  ? <a href="#talks" className="rp-btn rp-btn-ghost"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg> Watch Roni speak</a>
                  : <a href="#writing" className="rp-btn rp-btn-ghost">Read the essays</a>}
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="rp-btn rp-btn-text">LinkedIn ↗</a>
              </div>
              <div className="rp-hero-sig">
                <span className="rp-sig-mark" role="img" aria-label="Roni Paul's signature" style={{ backgroundImage: `url(${IMG.signature})` }} />
                <span>Founder, MedMate</span>
              </div>
            </div>

            <figure className="rp-hero-media">
              <div className="rp-photo">
                {/* Served at its plain URL (55 KB) so the on-page photo, the schema image and the search thumbnail are the same file. */}
                <Image src={IMG.headshot} alt="Roni Paul, Founder & CEO of MedMate, photographed in Bengaluru" width={820} height={880} priority unoptimized />
              </div>
              <figcaption className="rp-photo-cap">
                <b>Roni Paul</b>
                <span>Bengaluru · 2026</span>
              </figcaption>
              <div className="rp-photo-badge">
                <span className="rp-badge-n">3rd</span>
                <span className="rp-badge-l">company</span>
              </div>
            </figure>
          </div>
        </section>

        <Ticker />

        {/* ------------------------------------------------ STATS */}
        <section className="rp-stats" aria-label="At a glance">
          <div className="rp-wrap">
            <ul className="rp-stats-row rp-reveal">
              {STATS.map(s => (
                <li key={s.l}>
                  <StatNumber value={s.n} />
                  <span className="rp-stat-l">{s.l}</span>
                  <span className="rp-stat-s">{s.s}</span>
                </li>
              ))}
            </ul>
            <p className="rp-stats-src">Sources: chemist count from the <a href="https://aiocd.org/" target="_blank" rel="noopener noreferrer">All India Organisation of Chemists &amp; Druggists</a> (12.40 lakh, March 2026); MedMate incorporated 14 July 2026, per the <a href="https://www.mca.gov.in/" target="_blank" rel="noopener noreferrer">Ministry of Corporate Affairs</a>. Every figure on this site is dated and sourced on the <Link href={`${PAGE_PATH}/facts`}>Facts page</Link>.</p>
          </div>
        </section>

        {/* ------------------------------------------------ ABOUT */}
        <section id="about" className="rp-sec">
          <div className="rp-wrap rp-about">
            <div className="rp-sec-head rp-reveal">
              <p className="rp-eyebrow">{num("about")} · About</p>
              <h2 className="rp-h2">The short version</h2>
            </div>
            <div className="rp-about-body rp-reveal">
              <p className="rp-lead">
                Roni Paul is a health-tech, med-tech and healthcare entrepreneur from Assam, now based in Bengaluru. He grew
                up inside the medicine business: his father and uncle run a pharmacy, a drug-distribution operation
                and a diagnostic centre, so he watched from childhood how a chemist buys, stocks, prices and sells,
                and where the money actually leaks.
              </p>
              <p>
                He went abroad to study medicine and left medical school to build companies instead. That was
                around 2019. His first was a hospitality business launched into Covid, an industry the pandemic then
                took apart twice. He moved to Bengaluru, joined a healthcare startup as Chief Operating Officer,
                working with hospitals and as a partner in the business, and then founded a media agency that he
                still runs.
              </p>
              <p>
                MedMate is his third company, and the one he has been preparing for his whole life. India&apos;s
                neighbourhood pharmacies are losing customers to apps that will never know their names. Not
                because the shops are worse, but because they have no software and no delivery. MedMate gives
                them both. He writes about it here: on{" "}
                <Link href={`${PAGE_PATH}/notes/the-money-that-dies-on-the-shelf`}>pharmacy expiry losses in India</Link>, on{" "}
                <Link href={`${PAGE_PATH}/notes/the-customer-who-moved`}>quick commerce versus the neighbourhood chemist</Link>, and on{" "}
                <Link href={`${PAGE_PATH}/notes/why-i-left-medical-school`}>leaving medical school to build companies</Link>.
              </p>
              <blockquote className="rp-quote">
                <p>&ldquo;Your shop has looked after this neighbourhood for years. Somebody should look after your shop now.&rdquo;</p>
                <cite>Roni Paul, to Bengaluru&apos;s chemists</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ JOURNEY */}
        <section id="journey" className="rp-sec rp-sec-dark">
          <div className="rp-wrap rp-journey">
            <div className="rp-sec-head rp-reveal">
              <p className="rp-eyebrow">{num("journey")} · Journey</p>
              <h2 className="rp-h2">Seven years, three companies, one lifelong business</h2>
              <p className="rp-sec-sub">Every company taught something the next one needed. This is the record, in order.</p>
            </div>
            <ol className="rp-timeline">
              {JOURNEY.map((j, i) => (
                <li key={j.t} className={"rp-tl-item rp-reveal" + (j.now ? " is-now" : "")} style={{ transitionDelay: `${i * 40}ms` }}>
                  <span className="rp-tl-dot" aria-hidden="true" />
                  <span className="rp-tl-k">{j.k}</span>
                  <h3 className="rp-tl-t">{j.t}</h3>
                  <p className="rp-tl-d">{j.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <PlaybookSection />

        {/* ------------------------------------------------ BUILDING IN PUBLIC BANNER */}
        <section className="rp-banner" aria-label="Building in public">
          <div className="rp-banner-media" aria-hidden="true">
            <Image src={BANNER.src} alt={BANNER.alt} width={BANNER.w} height={BANNER.h} sizes="(max-width: 900px) 100vw, 55vw" className="rp-banner-img" />
            {BANNER.video?.mp4 && <BannerLoop />}
            <div className="rp-banner-shade" />
            <span className="rp-banner-live"><i />Behind the scenes</span>
          </div>
          <div className="rp-banner-in rp-reveal">
            <p className="rp-banner-k"><i />{BANNER.kicker}</p>
            <h2 className="rp-banner-h">{BANNER.line1}<br /><em>{BANNER.line2}</em></h2>
            <p className="rp-banner-sub">{BANNER.sub}</p>
            <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer" className="rp-btn rp-btn-gold rp-banner-cta">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
              Follow {INSTAGRAM.handle}
            </a>
          </div>
        </section>

        {/* ------------------------------------------------ MEDMATE */}
        <section id="medmate" className="rp-sec">
          <div className="rp-wrap">
            <div className="rp-sec-head rp-reveal">
              <p className="rp-eyebrow">{num("medmate")} · What he is building</p>
              <h2 className="rp-h2">MedMate</h2>
              <p className="rp-sec-sub">
                A platform where people buy medicine from their neighbourhood pharmacy and MedMate delivers it in
                minutes. The shop keeps the customer. MedMate does everything else.
              </p>
            </div>
            <div className="rp-cards">
              {CAPABILITIES.map((c, i) => (
                <div key={c.t} className="rp-card is-static rp-reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="rp-card-k">{c.k}</span>
                  <h3 className="rp-card-t">{c.t}</h3>
                  <p className="rp-card-d">{c.d}</p>
                </div>
              ))}
            </div>
            <p className="rp-medmate-cta rp-reveal"><a href={MEDMATE_URL} className="rp-btn rp-btn-dark">Visit medmatepharmacy.com →</a></p>
          </div>
        </section>

        {SHOW_TALKS && <TalksSection />}
        <GallerySection />

        {/* ------------------------------------------------ POINT OF VIEW */}
        <section id="pov" className="rp-sec rp-sec-cream">
          <div className="rp-wrap">
            <div className="rp-sec-head rp-reveal">
              <p className="rp-eyebrow">{num("pov")} · Point of view</p>
              <h2 className="rp-h2">What he believes</h2>
              <p className="rp-sec-sub">Four positions he will defend on any stage. Quote freely.</p>
            </div>
            <div className="rp-beliefs">
              {BELIEFS.map((b, i) => (
                <article key={b.q} className="rp-belief rp-reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="rp-belief-n">0{i + 1}</span>
                  <h3 className="rp-belief-q">{b.q}</h3>
                  <p className="rp-belief-d">{b.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ SPEAKING & MEDIA */}
        <section id="speaking" className="rp-sec">
          <div className="rp-wrap rp-speak">
            <div className="rp-speak-left rp-reveal">
              <p className="rp-eyebrow">{num("speaking")} · Speaking &amp; media</p>
              <h2 className="rp-h2">Topics he speaks on</h2>
              <p className="rp-sec-sub">
                Plain-spoken, from behind the counter. Available for podcasts, panels, guest columns, campus talks
                and press comment on pharmacy retail and Indian health-tech.
              </p>
              <ul className="rp-topics">
                {TOPICS.map(t => <li key={t}>{t}</li>)}
              </ul>
              <Link href="/speaking" className="rp-btn rp-btn-dark">Invite Roni to speak →</Link>
            </div>
            <aside className="rp-facts rp-reveal" aria-label="Quick facts for journalists">
              <h3 className="rp-facts-h">Quick facts for journalists</h3>
              <dl>
                {FACTS.map(([k, v]) => (
                  <div key={k} className="rp-fact">
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        {/* ------------------------------------------------ WRITING */}
        <section id="writing" className="rp-sec rp-sec-cream">
          <div className="rp-wrap">
            <div className="rp-sec-head rp-reveal">
              <p className="rp-eyebrow">{num("writing")} · Writing</p>
              <h2 className="rp-h2">Notes from the build</h2>
              <p className="rp-sec-sub">What pharmacy owners actually say when you sit behind their counter, what it costs to put riders on the road, and the numbers as they come in. Published here first, then on LinkedIn.</p>
            </div>
            <div className="rp-writing">
              {[...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3).map((w, i) => (
                <Link key={w.slug} href={`${PAGE_PATH}/notes/${w.slug}`} className="rp-post rp-reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="rp-post-k">{w.kind} · {w.readMins} min read</span>
                  <h3 className="rp-post-t">{w.title}</h3>
                  <p className="rp-post-d">{w.dek}</p>
                  <span className="rp-arrow">Read the essay →</span>
                </Link>
              ))}
            </div>
            <p className="rp-writing-more"><Link href={`${PAGE_PATH}/notes`}>All essays →</Link></p>
          </div>
        </section>

        {/* ------------------------------------------------ IN THE NEWS */}
        {SHOW_NEWS && <section id="news" className="rp-sec rp-news">
          <div className="rp-wrap rp-news-in">
            <div className="rp-sec-head rp-reveal">
              <p className="rp-eyebrow">{num("news")} · In the news</p>
              <h2 className="rp-h2">Mentions, podcasts and panels</h2>
              <p className="rp-sec-sub">Every appearance, dated. Journalists and hosts: add yours by emailing the address below.</p>
            </div>
            <ol className="rp-news-list rp-reveal">
              {[...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1)).map(n => {
                const upcoming = !n.url;
                const Row = (upcoming ? "div" : "a") as "a";
                return (
                  <li key={n.date + n.title}>
                    <Row className={"rp-news-row" + (upcoming ? " is-upcoming" : "")} {...(!upcoming ? { href: n.url, target: "_blank", rel: "noopener noreferrer" } : {})}>
                      <time dateTime={n.date}>{fmt(n.date, "short")}</time>
                      <span className="rp-news-outlet">{n.outlet}</span>
                      <span className="rp-news-title">{n.title}</span>
                      <span className={"rp-tag" + (upcoming ? " is-soft" : "")}>{upcoming ? "Upcoming" : n.kind}</span>
                    </Row>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>}

        {/* ------------------------------------------------ PRESS KIT */}
        <section id="press" className="rp-sec rp-sec-dark">
          <div className="rp-wrap">
            <div className="rp-sec-head rp-reveal">
              <p className="rp-eyebrow">{num("press")} · Press kit</p>
              <h2 className="rp-h2">Everything you need to write about Roni</h2>
              <p className="rp-sec-sub">Approved bios in three lengths, a print-ready headshot and the MedMate logo. Copy, download, publish.</p>
            </div>

            <div className="rp-press">
              <div className="rp-bios rp-reveal">
                {([
                  ["One line", BIOS.oneLine],
                  ["50 words", BIOS.short],
                  ["Full bio", BIOS.long],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="rp-bio">
                    <div className="rp-bio-head">
                      <span className="rp-bio-k">{k}</span>
                      <CopyButton text={v} />
                    </div>
                    {v.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                ))}
              </div>

              <div className="rp-assets rp-reveal">
                <a className="rp-asset" href={IMG.headshot} download="Roni-Paul-Founder-MedMate-headshot.jpg">
                  <Image src={IMG.headshot} alt="Roni Paul, Founder & CEO of MedMate, press headshot" width={820} height={880} sizes="(max-width: 1024px) 90vw, 380px" />
                  <span className="rp-asset-meta"><b>Headshot</b><span>JPG · 820×880 · {PHOTO_LICENCE.creditText}</span></span>
                  <span className="rp-arrow">Download ↓</span>
                </a>
                <div className="rp-asset rp-asset-more">
                  <b>More photos <span className="rp-asset-count">{PHOTOS.length} photos · scroll</span></b>
                  <ul>
                    {PHOTOS.map((ph, i) => (
                      <li key={ph.src}><a href={ph.src} download={`Roni-Paul-${String(i + 1).padStart(2, "0")}.jpg`}>{ph.cap} <span>↓</span></a></li>
                    ))}
                  </ul>
                </div>
                <a className="rp-asset rp-asset-logo" href={IMG.logoLight} download="MedMate-logo.png">
                  <span className="rp-asset-logo-box"><Image src={IMG.logoLight} alt="MedMate logo" width={501} height={162} /></span>
                  <span className="rp-asset-meta"><b>MedMate logo</b><span>PNG · light background</span></span>
                  <span className="rp-arrow">Download ↓</span>
                </a>
                <div className="rp-asset rp-asset-rules">
                  <b>Style notes</b>
                  <ul>
                    <li>Write &ldquo;Roni Paul&rdquo;, first reference; &ldquo;Roni&rdquo; after.</li>
                    <li>Descriptor: &ldquo;health-tech entrepreneur&rdquo;. Title: Founder &amp; CEO, MedMate. Write &ldquo;MedMate&rdquo; with both capitals, one word.</li>
                    <li>Say &ldquo;studied medicine&rdquo; or &ldquo;left medical school&rdquo;, not a completed degree.</li>
                    <li>Lead with the track record: three companies since 2019. MedMate is the third.</li>
                    <li>Photos: free to use with credit &ldquo;{PHOTO_LICENCE.creditText}&rdquo;. No cropping into other people&apos;s branding.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ FAQ */}
        <section id="faq" className="rp-sec rp-sec-cream">
          <div className="rp-wrap rp-faq">
            <div className="rp-sec-head rp-reveal">
              <p className="rp-eyebrow">{num("faq")} · Questions people ask</p>
              <h2 className="rp-h2">Straight answers</h2>
              <p className="rp-sec-sub">The questions that come up in interviews, searches and DMs, answered once.</p>
            </div>
            <div className="rp-faq-list rp-reveal">
              {FAQ.map((f, i) => (
                <details key={f.q} className="rp-faq-item" open={i === 0}>
                  <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ CONTACT */}
        <section id="contact" className="rp-sec rp-contact">
          <div className="rp-wrap rp-contact-in rp-reveal">
            <p className="rp-eyebrow">{num("contact")} · Contact</p>
            <h2 className="rp-h2 rp-contact-h">
              Press, speaking, partnerships, <em>or a pharmacy that wants to talk.</em>
            </h2>
            <div className="rp-contact-links">
              <a href={`mailto:${CONTACT.email}`} className="rp-contact-link">
                <span className="rp-contact-k">Email</span>
                <span className="rp-contact-v is-long">{CONTACT.email}</span>
              </a>
              {SOCIAL.filter(x => x.url).map(x => (
                <a key={x.key} href={x.url} target="_blank" rel="noopener noreferrer me" className="rp-contact-link">
                  <span className="rp-contact-k">{x.label}</span>
                  <span className="rp-contact-v">{x.handle || x.label} ↗</span>
                </a>
              ))}
              <a href={CONTACT.companySite} className="rp-contact-link">
                <span className="rp-contact-k">Company</span>
                <span className="rp-contact-v">medmatepharmacy.com →</span>
              </a>
              <div className="rp-contact-link is-static">
                <span className="rp-contact-k">Based in</span>
                <span className="rp-contact-v">{CONTACT.location}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="rp-foot">
        <div className="rp-wrap rp-foot-grid">
          <div className="rp-foot-brand">
            <a href="#top" className="rp-brand" aria-label={`${NAME_TITLE}, back to top`}>
              <span className="rp-brand-mono"><img src="/roni-paul/favicon.svg" alt="Roni Paul monogram" width={36} height={36} /></span>
              <span className="rp-brand-name">Roni Paul</span>
            </a>
            <p className="rp-foot-tag">Built in Bengaluru, by a pharmacy family.</p>
            <p className="rp-foot-official">ronipaul.com is the official website of Roni Paul, founder &amp; CEO of MedMate.</p>
            <div className="rp-foot-social">
              {SOCIAL.filter(x => x.url).map(x => (
                <a key={x.key} href={x.url} target="_blank" rel="noopener noreferrer me">{x.label} ↗</a>
              ))}
            </div>
          </div>
          <nav className="rp-foot-col" aria-label="Sections">
            <h4>On this page</h4>
            {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
            <a href="#speaking">Speaking</a>
            {SHOW_NEWS && <a href="#news">In the news</a>}
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <nav className="rp-foot-col" aria-label="Essays">
            <h4>Essays</h4>
            {NOTES.map(n => <Link key={n.slug} href={`${PAGE_PATH}/notes/${n.slug}`}>{n.title}</Link>)}
            <Link href={`${PAGE_PATH}/notes`}>All essays →</Link>
            <Link href={`${PAGE_PATH}/facts`}>Facts &amp; sources</Link>
          </nav>
          <nav className="rp-foot-col" aria-label="MedMate">
            <h4>MedMate</h4>
            <a href={MEDMATE_URL}>medmatepharmacy.com</a>
            <a href={`${MEDMATE_URL}/about`}>About MedMate</a>
            <a href={`${MEDMATE_URL}/contact`}>Contact MedMate</a>
          </nav>
        </div>
        <div className="rp-wrap rp-foot-in">
          <span>© 2026 {NAME_TITLE} · Medmate India Technology Private Limited</span>
          <span className="rp-foot-trust">Written by Roni Paul. Figures carry their source and date on the <Link href={`${PAGE_PATH}/facts`}>Facts page</Link>; corrections to the email above.</span>
          <span className="rp-foot-meta"><a href="#press">Press kit &amp; photo licence</a> · <a href={`${PAGE_PATH}/llms.txt`}>llms.txt</a> · <a href={`${PAGE_PATH}/feed.xml`}>RSS</a> · Updated {UPDATED}</span>
        </div>
      </footer>
    </>
  );
}
