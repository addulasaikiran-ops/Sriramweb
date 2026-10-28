import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteUrl = configuredSiteUrl ? new URL(configuredSiteUrl).origin : undefined;

  // A sitemap must use absolute canonical URLs; never guess the production host.
  if (!siteUrl) return [];

  return [
    {
      url: new URL("/", siteUrl).toString(),
      priority: 1,
    },
  ];
}
