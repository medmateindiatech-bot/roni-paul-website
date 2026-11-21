import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./roni.css";
import Analytics from "./Analytics";
import { CITY, DESCRIPTOR, IMG, NAME, NAME_TITLE, PAGE_PATH, SITE_URL, VERIFICATION } from "./site";

/* Self-hosted via next/font: no render-blocking Google Fonts stylesheet, files preloaded, swap on. */
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

export const viewport = { themeColor: "#0B0F0D" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${NAME} – ${DESCRIPTOR}, Founder of MedMate`,
    template: `%s | ${NAME}`,
  },
  description:
    "Official website of Roni Paul, health-tech entrepreneur from Assam, based in Bengaluru. Founder & CEO of MedMate: local pharmacy medicine in minutes.",
  keywords: [
    "Roni Paul",
    "Roni Paul official website",
    "ronipaul.com",
    "Roni Paul founder",
    "Roni Paul MedMate",
    "Roni Paul Bengaluru",
    "MedMate founder",
    "MedMate CEO",
    "health-tech entrepreneur",
    "health-tech entrepreneur India",
    "healthtech founder Bengaluru",
    "Indian health-tech entrepreneur",
    "pharmacy software founder India",
    "serial entrepreneur Bengaluru",
    "entrepreneurship speaker India",
    "how to grow from scratch",
    "Medmate India Technology",
  ],
  authors: [{ name: NAME, url: `${SITE_URL}${PAGE_PATH}` }],
  creator: NAME,
  publisher: NAME,
  alternates: { canonical: "/", types: { "application/rss+xml": [{ url: "/feed.xml", title: "Roni Paul · Notes from the build" }] } },
  icons: {
    icon: [
      /* Roni's photo (round, gold ring). 48/96/192 are the multiples of 48 px that Google asks for. */
      { url: "/roni-paul/icons/photo-48.png", sizes: "48x48", type: "image/png" },
      { url: "/roni-paul/icons/photo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/roni-paul/icons/photo-16.png", sizes: "16x16", type: "image/png" },
      { url: "/roni-paul/icons/photo-96.png", sizes: "96x96", type: "image/png" },
      { url: "/roni-paul/icons/photo-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/roni-paul/icons/apple-touch-photo.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  other: { thumbnail: `${SITE_URL}${IMG.headshot}` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: {
    ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
    ...(VERIFICATION.bing ? { other: { "msvalidate.01": VERIFICATION.bing } } : {}),
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "/",
    siteName: NAME,
    title: `${NAME} · ${DESCRIPTOR} · Founder & CEO, MedMate`,
    description:
      "The official website of Roni Paul, health-tech entrepreneur from Bengaluru. Founder & CEO of MedMate, the platform where India buys medicine from its neighbourhood pharmacy, delivered in minutes. Bio, essays, talks, photos and press kit.",
    images: [{ url: IMG.shareCard, width: 1200, height: 630, alt: `${NAME}, ${DESCRIPTOR}, Founder & CEO of MedMate, ${CITY}` }],
    firstName: "Roni",
    lastName: "Paul",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} · ${DESCRIPTOR} · Founder & CEO, MedMate`,
    description: "Health-tech entrepreneur from Bengaluru. Founder & CEO of MedMate: medicine from your neighbourhood pharmacy, delivered in minutes.",
    images: [IMG.shareCard],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <div className="rp-root">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
