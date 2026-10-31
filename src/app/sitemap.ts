import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/gooty-to-tirupati-taxi",
  "/gooty-to-bengaluru-cab",
  "/tempo-traveller-on-rent-gooty",
  "/towing-service-gooty",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  return routes.map((route) => ({
    url: new URL(route, base).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
