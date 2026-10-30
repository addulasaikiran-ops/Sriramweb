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

This repository configures the MIT-licensed Claude SEO plugin from [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) in `.claude/settings.json`. Open the project in Claude Code and approve the project marketplace/plugin if prompted. If it is not available, run the upstream installation commands:

```text
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-claude-seo
/seo setup
```

Then use targeted audits such as `/seo technical`, `/seo schema`, `/seo sitemap`, `/seo local`, and `/seo performance`. These commands run in Claude Code, not in GitHub Actions. See `docs/seo-implementation.md` and `.claude/skills/sriram-travels-seo/SKILL.md` for the project-specific checklist.

## Deployment

Cloudflare Workers/OpenNext configuration is included. Run `npm run preview` before `npm run deploy`; verify the actual deployed domain, contact links, sitemap, robots route and mobile layout after deployment. Owner confirmation is still required for phone number, fleet details, fares and the canonical domain.


## Lead capture setup

The enquiry form posts to `POST /api/leads`. To persist leads, deploy a Google Apps Script web app that validates the request (including `x-lead-secret` when configured) and appends the received JSON fields to your Google Sheet. Set `GOOGLE_SHEETS_WEBHOOK_URL` in the hosting environment to that web app URL. Optionally set `LEADS_WEBHOOK_SECRET` and validate it in Apps Script. Without the webhook URL, the API returns a configuration error; the form still hands the visitor off to WhatsApp and displays a warning. The API includes a hidden honeypot and a best-effort in-memory per-IP rate limit; add provider-level rate limiting for stronger production protection.


## Analytics setup

Set `NEXT_PUBLIC_GA_ID` to your Google Analytics 4 measurement ID (for example, the `G-...` ID from your GA4 web data stream). When configured, the site emits `call_click`, `whatsapp_click`, and `form_submit` events. No measurement ID is hard-coded; analytics stays disabled when the environment variable is empty.
