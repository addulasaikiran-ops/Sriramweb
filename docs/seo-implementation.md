# SEO implementation and release checklist

## Claude SEO plugin

This repository declares the upstream MIT-licensed Claude SEO marketplace and enables its plugin in `.claude/settings.json`. Claude Code may require project trust and explicit plugin installation approval. After approval, run `/seo setup` and use the targeted `/seo` audit commands. The repository-local `.claude/skills/sriram-travels-seo/SKILL.md` captures project constraints; it is not a vendored copy of the upstream plugin.

Upstream: https://github.com/AgriciDaniel/claude-seo

## Required deployment configuration

Set `NEXT_PUBLIC_SITE_URL` to the real canonical HTTPS origin in the deployment environment and local `.env.local` when testing. Do not use the example placeholder in production. The sitemap intentionally contains no entries until a canonical origin is configured. The robots route emits the sitemap URL only when that origin is configured.

## Current implementation

- Server-rendered metadata with canonical, Open Graph and Twitter card fields.
- JSON-LD graph for the rental business and website, limited to current project facts.
- Sitemap and robots routes based on the configured canonical origin.
- A single canonical homepage; no fabricated city/service landing pages.
- No fabricated street address, opening hours, coordinates, ratings, reviews or prices.

## Release checklist

- [ ] Owner verifies business name, phone/WhatsApp, service area and fleet information.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin.
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] Validate JSON-LD and metadata in rendered HTML.
- [ ] Verify `/robots.txt` and `/sitemap.xml` on the deployed domain.
- [ ] Run Claude SEO technical, schema, sitemap, local and performance audits.
- [ ] Verify desktop/mobile layout, reduced motion, console and contact actions.
- [ ] Run the Cloudflare preview/deploy workflow and inspect the deployed site.
- [ ] Record measured Lighthouse/Core Web Vitals only after collecting the results.
