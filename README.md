# Sriram Travels — Premium Fleet & Towing

Responsive landing page built with Next.js, TypeScript, Tailwind CSS and GSAP ScrollTrigger.

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## SEO setup

Set `NEXT_PUBLIC_SITE_URL` to the real canonical HTTPS origin in your deployment environment. Do not use a placeholder domain in production. Without this value, the sitemap stays empty and canonical/absolute social metadata is omitted rather than guessed.

This repository configures the MIT-licensed Claude SEO plugin from [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) in `.claude/settings.json`. In Claude Code, approve the project marketplace/plugin if prompted, run `/seo setup`, and use targeted audits such as `/seo technical`, `/seo schema`, `/seo sitemap`, `/seo local`, and `/seo performance`. See `docs/seo-implementation.md` and `.claude/skills/sriram-travels-seo/SKILL.md` for the project-specific checklist.

## Deployment

Cloudflare Workers/OpenNext configuration is included. Run `npm run preview` before `npm run deploy`; verify the actual deployed domain, contact links, sitemap, robots route and mobile layout after deployment. Owner confirmation is still required for phone number, fleet details, fares and the canonical domain.
