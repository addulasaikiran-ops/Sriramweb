---
name: sriram-travels-seo
description: Apply and review technical SEO, local-business SEO, structured data, sitemap, metadata and content quality for the Sriram Travels Next.js website. Use before SEO edits or deployment.
---

# Sriram Travels SEO workflow

This project uses the MIT-licensed Claude SEO plugin by AgriciDaniel as its specialist audit toolkit, plus these project-specific constraints.

## Install and use the upstream plugin

The repository declares the upstream marketplace and enables `claude-seo@agricidaniel-claude-seo` in `.claude/settings.json`. Claude Code may ask a user to trust the project or confirm plugin installation; approve only after reviewing the marketplace and plugin. If the plugin is not available after opening the repository, run the official commands in Claude Code:

```text
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-claude-seo
/seo setup
```

Then use targeted commands such as `/seo audit`, `/seo technical`, `/seo schema`, `/seo sitemap`, `/seo local`, and `/seo performance` as appropriate. The upstream plugin is not copied wholesale into this repository and its commands do not run in GitHub Actions.

Upstream source and install instructions: https://github.com/AgriciDaniel/claude-seo (MIT). Re-check upstream instructions before changing plugin setup.

## Repository-specific rules

- App: Next.js App Router, TypeScript; use the Metadata API and route handlers in `src/app`.
- Confirmed business context in current project data: Sriram Travels; Gooty, Andhra Pradesh; phone and WhatsApp are in `src/data/site.ts`. Owner must verify these before production.
- The site currently has one public landing page. Keep the sitemap limited to real canonical URLs; do not fabricate location pages or doorway pages.
- Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS production origin. Never invent a domain or ship a placeholder origin.
- Structured data must match visible page content. Do not fabricate a street address, opening hours, coordinates, reviews, ratings, prices, fleet availability, service guarantees or social profile URLs.
- Do not add FAQPage JSON-LD just to seek Google FAQ rich results.
- Never claim SEO results, Lighthouse scores, Search Console results or Core Web Vitals improvements unless measured.
- Protect the cinematic experience: honor reduced motion, keep call/WhatsApp actions available without waiting for the intro, and avoid animation-induced content overlap.
- Do not add API keys, analytics IDs, customer data or private business details to source control.

## Audit checklist

1. Crawlability: verify `/robots.txt`, `/sitemap.xml`, HTTP status, canonical URLs and indexability.
2. Metadata: title/description, canonical, Open Graph/Twitter cards, image dimensions/alt, language.
3. Structured data: valid JSON-LD in server-rendered HTML; absolute URLs only when the domain is configured; safely escape JSON embedded in HTML.
4. Local SEO: consistent business name, verified phone and service area; owner verification of Google Business Profile; no fake reviews or keyword-stuffed pages.
5. Content: useful information for local/outstation rental, family/group trips and towing enquiries; mark provisional fleet details clearly.
6. Performance/mobile: production build, mobile and desktop Lighthouse/PageSpeed, image loading, console errors, layout shift and reduced-motion checks.
7. Release: `npm run lint`, `npm run typecheck`, `npm run build`, Cloudflare preview/deploy checks, then verify deployed routes.

## Reporting

Report severity (Critical / High / Medium / Low / Info), evidence, concrete fix and verification. Separate repository facts from owner follow-ups. Do not mark an audit as complete based on code review or CI alone.
