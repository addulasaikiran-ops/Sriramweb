import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

  // A sitemap must contain absolute canonical URLs. Set NEXT_PUBLIC_SITE_URL
  // in every deployed environment; never emit a guessed production domain.
  if (!base) return [];

  return [
    {
      url: new URL("/", base).toString(),
      priority: 1,
    },
  ];
}
