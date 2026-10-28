import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteUrl = configuredSiteUrl ? new URL(configuredSiteUrl).origin : undefined;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(siteUrl
      ? {
          host: siteUrl,
          sitemap: new URL("/sitemap.xml", siteUrl).toString(),
        }
      : {}),
  };
}
