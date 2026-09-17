import { org } from "@/content/site";

/**
 * Production domain is not decided yet. Set NEXT_PUBLIC_SITE_URL (no trailing
 * slash) in Vercel / .env.local and every canonical, sitemap, Open Graph and
 * JSON-LD URL follows. The placeholder keeps builds working meanwhile.
 */
const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
export const SITE_URL = raw || "https://loveandlightfoundation.example";

export const SITE_NAME = org.name;
export const SITE_TITLE = `${org.name} | ${org.tagline}`;
export const SITE_DESCRIPTION = org.description;
export const OG_IMAGE_PATH = "/opengraph-image";
