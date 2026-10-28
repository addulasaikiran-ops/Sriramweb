# Sriram Travels — Premium Fleet & Towing

Responsive landing page built with Next.js, TypeScript, Tailwind CSS and GSAP ScrollTrigger.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Project structure

- `src/app` — App Router pages, metadata, robots, sitemap and global styles
- `src/components` — reusable UI components
- `src/data/site.ts` — fleet, services and contact data
- `.claude/skills/sriram-travels-seo/SKILL.md` — project-specific SEO audit and publishing checklist
- `docs/seo-implementation.md` — SEO implementation notes and owner follow-ups
- GSAP ScrollTrigger — scroll-linked entrances and reveal animations

## SEO and deployment

Set `NEXT_PUBLIC_SITE_URL` to the real canonical HTTPS origin in local environment files and the Cloudflare/Vercel deployment environment, for example `https://www.your-real-domain.in`. Do not use the example domain literally. The sitemap intentionally returns no entries when this variable is missing rather than publishing a guessed URL. After deployment, verify `/robots.txt`, `/sitemap.xml`, canonical metadata, and JSON-LD using Search Console and Schema Markup Validator.

The page currently targets Gooty, Andhra Pradesh and uses the contact number in `src/data/site.ts`. Do not add an unverified street address, opening hours, service area, rating, customer review, exact fleet capacity, or rate. The fleet images are illustrative references until owner-approved real fleet images replace them.

## Before publishing

Review phone and WhatsApp values in `src/data/site.ts`, confirm the canonical site URL, and replace sample vehicle imagery with approved assets. The project-specific SEO skill documents a safe audit workflow informed by [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) (MIT).
