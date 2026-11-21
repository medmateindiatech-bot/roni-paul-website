import type { MetadataRoute } from "next";
import { NOTES } from "./notes";
import { SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/notes`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/facts`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/facts/pharmacists-by-state`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/speaking`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...NOTES.map(n => ({ url: `${SITE_URL}/notes/${n.slug}`, lastModified: new Date(n.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
