---
name: sriram-travels-seo
description: Apply and review technical SEO, local-business SEO, structured data, sitemap, metadata and content quality for the Sriram Travels Next.js website. Use before SEO edits or deployment.
---

# Sriram Travels SEO workflow

Use this skill when auditing or changing SEO on this repository. It is a project-specific workflow informed by the technical, schema, sitemap, local SEO and content skills in [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) (MIT). It does not vendor or install the entire upstream plugin.

## Repository-specific rules

- App: Next.js App Router, TypeScript; use server-rendered Metadata API and route handlers in `src/app`.
- Business context currently confirmed in the project: Sriram Travels; Gooty, Andhra Pradesh; telephone and WhatsApp are in `src/data/site.ts`.
- Single public landing page today. Keep the sitemap limited to real, canonical URLs; do not fabricate location pages to target keywords.
- Use the real HTTPS domain from `NEXT_PUBLIC_SITE_URL`. Never invent a production host.
- Structured data must match visible page content. Do not add fabricated street address, opening hours, coordinates, customer reviews, ratings, prices, fleet availability, service guarantees or social profile URLs.
- Avoid adding FAQPage JSON-LD just to seek Google FAQ rich results. The visible FAQ is primarily for customers.
- Never claim an SEO result, Lighthouse score or Search Console result unless measured.
- Protect the cinematic experience: optimize assets, honor reduced motion, and keep call/WhatsApp actions available without requiring the intro to finish.

## Audit checklist

1. **Crawlability:** verify `/robots.txt`, `/sitemap.xml`, HTTP status, canonical URLs and no accidental `noindex`.
2. **Metadata:** unique title/description; canonical; Open Graph/Twitter card; image dimensions/alt; correct `lang`.
3. **Structured data:** JSON-LD in initial server-rendered HTML; valid `@context`/types; absolute URLs only when the domain is configured; no invented claims.
4. **Local SEO:** consistent business name, phone and service area; owner verification of Google Business Profile; no fake reviews or keyword-stuffed location pages.
5. **Content:** useful information for local/outstation car rental, family/group trips and towing enquiries; explain how to contact and what details to share; keep unverified fleet information marked as provisional.
6. **Performance and mobile:** run production build, check Core Web Vitals/Lighthouse on desktop and mobile, image loading, JS console and layout shift; test with reduced-motion enabled.
7. **Release verification:** run `npm run lint`, `npx tsc --noEmit` and `npm run build`; check the deployed routes after configuration is set.

## Reporting format

Report each finding with severity (Critical / High / Medium / Low / Info), evidence in the repository or a measured URL, concrete fix, and a verification step. Separate confirmed facts from owner follow-ups.
