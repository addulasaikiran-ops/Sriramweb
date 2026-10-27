import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL; if (!base) return []; return [{ url: new URL("/", base).toString(), lastModified: new Date(), changeFrequency: "monthly", priority: 1 }]; }
