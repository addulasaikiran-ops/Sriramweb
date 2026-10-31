# Sriram Travels — Premium Fleet & Towing

Responsive, mobile-first website built with Next.js, TypeScript, Tailwind CSS and GSAP ScrollTrigger. Primary conversion paths are direct phone calls and prefilled WhatsApp enquiries.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Environment configuration

Copy `.env.example` to `.env.local` for local development and configure these values in the deployment environment:

- `NEXT_PUBLIC_SITE_URL` — optional canonical origin override. Defaults to the current Vercel URL; update it if a custom domain becomes the primary site.
- `LEAD_WEBHOOK_URL` — required to forward website form submissions to a lead destination such as a secured Google Apps Script webhook. Without it, the form still hands off to WhatsApp but the API does not persist the lead.
- `LEADS_WEBHOOK_SECRET` — optional shared secret sent as `x-lead-secret`; the receiving webhook must validate it.
- `NEXT_PUBLIC_GA_ID` — optional GA4 measurement ID.

Never commit secrets or private webhook URLs.

## Project structure

- `src/app` — App Router pages, service landing pages, sitemap, robots and API route
- `src/components` — reusable interface, enquiry form, analytics and Hanuman intro
- `src/data/site.ts` — contact, operating and editable pricing configuration
- `src/data/fleet.ts` — vehicle details and local image paths
- `public/fleet/` and `public/images/` — local placeholder illustrations
- GSAP ScrollTrigger — progressive, scroll-linked motion on devices that support it

## Before publishing

1. Confirm the business phone/WhatsApp number and replace all bracketed business configuration values in `src/data/site.ts` and `src/data/fleet.ts`.
2. Enter verified route distances and journey times, operating hours, towing coverage, response expectations, address and map pin.
3. Fill and verify prices before setting `SHOW_RATES = true`; rates remain hidden until the owner confirms them.
4. Replace local SVG vehicle/image placeholders with owner-approved photographs.
5. Configure and test `LEAD_WEBHOOK_URL`; verify delivery, access control and retention practices.
6. Review the Privacy Policy and Terms against actual business practices, payment/refund rules and cancellation terms.
7. Publish only genuine reviews and verified driver, insurance, permit, GPS and years-in-business claims.
8. Test phone and WhatsApp actions, enquiry form, navigation, keyboard access and layout on real Android devices and desktop browsers. Run Lighthouse on the deployed preview.

No fare, review, licence, service-level claim or compliance statement should be published unless the business has verified it.
