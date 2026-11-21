import type { MetadataRoute } from "next";
import { NAME, DESCRIPTOR } from "./site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${NAME} – ${DESCRIPTOR}`,
    short_name: NAME,
    description: `${NAME}, ${DESCRIPTOR.toLowerCase()} from Assam, based in Bengaluru. Founder & CEO of MedMate.`,
    start_url: "/",
    display: "browser",
    background_color: "#0B0F0D",
    theme_color: "#0B0F0D",
    icons: [
      { src: "/roni-paul/icons/photo-192.png", sizes: "192x192", type: "image/png" },
      { src: "/roni-paul/icons/photo-512.png", sizes: "512x512", type: "image/png" },
      { src: "/roni-paul/icons/photo-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
