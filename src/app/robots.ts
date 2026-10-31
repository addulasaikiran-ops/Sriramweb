import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://sriramweb-zctj.vercel.app";
  return {
    rules: { userAgent: "*", allow: "/", disallow: [] },
    ...(base ? { host: base, sitemap: `${base.replace(/\/$/, "")}/sitemap.xml` } : {}),
  };
}
