import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteUrl = configuredSiteUrl ? new URL(configuredSiteUrl).origin : "https://sriramweb-zctj.vercel.app";

  const routes = [
    { path: "/", priority: 1 },
    { path: "/gooty-to-tirupati-taxi", priority: 0.8 },
    { path: "/gooty-to-bengaluru-cab", priority: 0.8 },
    { path: "/tempo-traveller-on-rent-gooty", priority: 0.8 },
    { path: "/towing-service-gooty", priority: 0.8 },
    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return routes.map((route) => ({ url: new URL(route.path, siteUrl).toString(), priority: route.priority }));
}
