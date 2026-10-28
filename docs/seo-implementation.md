# SEO implementation notes

## Applied in this branch

- Expanded server-rendered JSON-LD from a minimal LocalBusiness record to an `AutoRental` business entity plus `WebSite` entity, using only site information already represented in the project.
- Added service catalogue entries for the three service categories shown on the landing page; no invented prices, hours, ratings or review counts.
- Normalized the canonical site origin when reading `NEXT_PUBLIC_SITE_URL`.
- Kept sitemap URLs absolute and removed automatically changing `lastModified` values, which would imply content freshness without evidence.
- Documented that `NEXT_PUBLIC_SITE_URL` must be configured to the real HTTPS production origin; no production domain is inferred.
- Added a repository-local Claude Code skill with an SEO audit checklist tailored to the site's Next.js/GSAP architecture.

## Owner/deployment follow-ups

1. Set `NEXT_PUBLIC_SITE_URL` to the actual production origin in the deployment dashboard and any production build environment.
2. Verify `/robots.txt` and `/sitemap.xml` after deployment; submit the sitemap in Google Search Console.
3. Confirm name, phone and current service area with the business owner.
4. Replace illustrative fleet images with approved original photos and accurate image alt text.
5. Add actual street address, opening hours, reviews, service areas or social profile links only after they are confirmed and displayed consistently.
6. Run Lighthouse and the Schema Markup Validator against the deployed page; this branch has not been represented as passing those checks yet.

## Upstream reference

This workflow was informed by relevant technical SEO, structured data, local SEO, sitemap and content-quality skills in [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo), an MIT-licensed Claude Code SEO plugin. This repository contains a small project-specific workflow, not a copy of the full upstream plugin.
