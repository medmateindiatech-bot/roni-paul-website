/* ============================================================
   ONE PLACE FOR EVERY PHOTO AND VIDEO ON /roni-paul.

   VIDEOS — paste a YouTube link (watch?v=…, youtu.be/…, or shorts/…)
   into `url`. The card turns into a click-to-play player with the
   YouTube thumbnail. Leave `url: ""` to show it as "coming soon".

   PHOTOS — drop files into public/roni-paul/gallery/ and add a row.
   `ratio` controls the tile shape: "portrait" | "square" | "wide".
   ============================================================ */

export type Talk = {
  url: string;
  title: string;
  venue: string;
  kind: "Keynote" | "Panel" | "Podcast" | "Interview" | "Founder story" | "Reel";
  year?: string;
  /* For VideoObject schema once `url` is set: ISO date the video was published, and a short summary. */
  date?: string;
  description?: string;
  /* Optional plain-text transcript, shown under the player and indexed by search engines. */
  transcript?: string;
};

export const TALKS: Talk[] = [
  {
    url: "",
    title: "Why we started MedMate",
    venue: "Founder message · Bengaluru",
    kind: "Founder story",
    year: "2026",
    date: "2026-09-20",
    description: "Roni Paul, founder of MedMate, on why India's neighbourhood pharmacies are losing customers to apps, and what MedMate does about it.",
  },
  {
    url: "",
    title: "Why India's pharmacies are losing to apps, and how they win back",
    venue: "Add venue · city",
    kind: "Keynote",
  },
  {
    url: "",
    title: "The ₹200 crore challenge: building in public",
    venue: "Instagram Reel series",
    kind: "Reel",
    year: "2026",
  },
  {
    url: "",
    title: "Leaving medical school to build companies",
    venue: "Add podcast name",
    kind: "Podcast",
  },
  {
    url: "",
    title: "Quick commerce vs. the neighbourhood chemist",
    venue: "Add panel · event",
    kind: "Panel",
  },
];

export type Photo = {
  src: string;
  alt: string; // full sentence with name + role + place — this is what image search indexes
  cap: string;
  /* "natural" = tile keeps the photo's own aspect ratio (no crop). */
  ratio: "portrait" | "square" | "wide" | "natural";
  w: number;
  h: number;
};

/* File names are deliberately descriptive (name-role-place) for image search. */
export const PHOTOS: Photo[] = [
  { src: "/roni-paul/gallery/roni-paul-building-in-public-laptop.jpg", alt: "Roni Paul, founder of MedMate, building in public at his laptop: you're watching it get built in real time", cap: "Building in public", ratio: "wide", w: 1920, h: 1080 },
  { src: "/roni-paul/gallery/roni-paul-with-bdcda-president-thirunavukkarasu-and-dr-sri-hari-alapaty.jpg", alt: "Roni Paul with Mr. B. Thirunavukkarasu, President of the Bangalore District Chemists & Druggists Association, and Dr. Sri Hari Alapaty, MedMate medical advisor, at India Pharma Channel", cap: "With the President of BDCDA and Dr. Sri Hari Alapaty", ratio: "natural", w: 2000, h: 1449 },
  { src: "/roni-paul/gallery/roni-paul-speaking-to-students-audience.jpg", alt: "Roni Paul, founder of MedMate, addressing a hall of students at a college talk in Bengaluru", cap: "Talking to students", ratio: "natural", w: 2000, h: 951 },
  { src: "/roni-paul/roni-paul-founder-medmate-bengaluru.jpg", alt: "Roni Paul, founder and CEO of MedMate, photographed in Bengaluru", cap: "Founder, MedMate", ratio: "natural", w: 820, h: 880 },
  { src: "/roni-paul/gallery/roni-paul-at-india-pharma-channel-with-bdcda-president.jpg", alt: "Roni Paul and a MedMate team member with Mr. B. Thirunavukkarasu, President of BDCDA, at India Pharma Channel", cap: "At India Pharma Channel", ratio: "natural", w: 2000, h: 1340 },
  { src: "/roni-paul/gallery/roni-paul-think-big-build-louder.jpg", alt: "Roni Paul, founder of MedMate, building in public: Think big. Build louder.", cap: "Think big. Build louder.", ratio: "portrait", w: 1080, h: 1350 },
  { src: "/roni-paul/gallery/roni-paul-magic-of-thinking-big-200-cr.jpg", alt: "Roni Paul reading The Magic of Thinking Big: read about big, I'm building it, ₹200 Cr, out loud", cap: "₹200 Cr, out loud", ratio: "portrait", w: 1080, h: 1350 },
  { src: "/roni-paul/gallery/roni-paul-speaking-on-stage-portrait.jpg", alt: "Roni Paul, founder of MedMate, speaking on stage at a college talk in Bengaluru", cap: "On stage", ratio: "natural", w: 1333, h: 2000 },
  { src: "/roni-paul/gallery/roni-paul-presenting-with-headset-mic.jpg", alt: "Roni Paul, founder of MedMate, presenting with a headset mic, slides on screen behind him", cap: "Presenting", ratio: "natural", w: 2000, h: 1333 },
  { src: "/roni-paul/gallery/roni-paul-arriving-at-college-talk.jpg", alt: "Roni Paul, founder of MedMate, arriving with his team for a college talk in Bengaluru", cap: "Arriving for the talk", ratio: "natural", w: 1848, h: 2000 },
  { src: "/roni-paul/gallery/roni-paul-on-stage-square.jpg", alt: "Roni Paul, founder of MedMate, on stage with a clicker, mid-talk at a college in Bengaluru", cap: "Mid-talk", ratio: "natural", w: 2000, h: 2000 },
  { src: "/roni-paul/gallery/roni-paul-founder-working-laptop-square.jpg", alt: "Roni Paul, MedMate founder, working on his laptop in Bengaluru", cap: "At work", ratio: "square", w: 1080, h: 1080 },
  // Add more (drop the file in public/roni-paul/gallery/ first): { src, alt, cap, ratio: "natural", w, h }
];

/* Full-width "building in public" banner between Journey and MedMate. */
export const BANNER = {
  src: "/roni-paul/roni-paul-building-in-public-banner-wide.jpg",
  alt: "Roni Paul, founder of MedMate, building the company in public, working at his laptop in Bengaluru",
  w: 1130,
  h: 1080,
  /* 2-second muted loop (behind the scenes). Leave `video` empty to show the photo only. */
  video: { mp4: "/roni-paul/roni-paul-bts-2s.mp4", webm: "/roni-paul/roni-paul-bts-2s.webm", poster: "/roni-paul/roni-paul-bts-poster.jpg", w: 1080, h: 1920 },
  kicker: "Building in public",
  line1: "You're watching it",
  line2: "get built in real time.",
  sub: "The ₹200 Crore Challenge: a Reel a day for 730 days, since 17 July 2026. What shipped, what broke, what pharmacy owners actually said. Follow along on Instagram.",
};

/* Photo licence shown in the press kit and in ImageObject schema. */
export const PHOTO_LICENCE = {
  creditText: "Courtesy Roni Paul / MedMate",
  license: "https://creativecommons.org/licenses/by-nd/4.0/",
  acquireLicensePage: "/roni-paul#press",
};

/* ------------------------------------------------------------
   IN THE NEWS — every mention, dated, newest first. `url: ""` = upcoming.
   ------------------------------------------------------------ */
export type NewsItem = {
  date: string; // ISO
  outlet: string;
  title: string;
  url: string;
  kind: "Press" | "Podcast" | "Panel" | "Interview" | "Own channel";
};

export const NEWS: NewsItem[] = [
  { date: "2026-07-17", outlet: "Instagram", title: "The ₹200 Crore Challenge begins: a build-in-public Reel every day for 730 days", url: "https://www.instagram.com/the_roni_paul", kind: "Own channel" },
  // { date: "2026-10-15", outlet: "YourStory", title: "…", url: "https://…", kind: "Press" },
];

/* Lines that scroll in the ticker under the hero. */
export const TICKER = [
  "The customer didn't leave the chemist. They moved.",
  "Namma means ours.",
  "It's not a discipline problem. It's a tooling problem.",
  "Three companies. Seven years. One lifelong business.",
  "Leave for something, not from something.",
  "Health-tech should be built from behind the counter.",
  "Built in Bengaluru, by a pharmacy family.",
];

/* Rotating descriptor in the hero kicker. */
export const ROLES = ["Health-tech entrepreneur", "Healthcare entrepreneur", "Founder & CEO, MedMate", "Pharmacy kid", "Speaker", "Building in public"];

export function youtubeId(url: string): string | null {
  if (!url) return null;
  const m =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/) ||
    url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
