# Prompt: UI/UX overhaul of Sriram Travels (addulasaikiran-ops/Sriramweb)

Paste everything below this line into Claude Code (or Cursor / Windsurf / Codex) with the Sriramweb repo open.

---

## 0. Role and goal

You are a senior product designer and front-end engineer. Improve the UI/UX of the **Sriram Travels & Towing Services** landing page (Next.js 15 App Router, React 19, TypeScript, GSAP ScrollTrigger, lucide-react, custom CSS in `src/app/globals.css`).

The business is a local car-rental and towing operator in **Gooty, Andhra Pradesh**. Visitors are mostly on mid-range Android phones, often on mobile data, and many arrive with an urgent need ("my vehicle broke down", "I need a 7-seater for Saturday"). The page must therefore be fast, readable outdoors, and make **calling or WhatsApp-ing in one tap** the easiest thing to do.

**Keep the brand direction**: deep navy `#111b2b`, warm gold `#c9a96e`, paper `#f5f3ee`, editorial headings (Manrope) with a serif-italic accent. Do not change it into a generic template. Fix the craft problems underneath it.

## 1. Install and use the UI UX Pro Max skill first

The skill is `nextlevelbuilder/ui-ux-pro-max-skill` (v2.15.0, MIT). Install it in the repo root:

```bash
npx ui-ux-pro-max-cli init --ai claude
```

Then read `.claude/skills/ui-ux-pro-max/SKILL.md` and follow its workflow. Detected stack: **nextjs** (confirmed from `package.json`). Run these searches and apply what fits. Run from the repo root, using `python3` if `python` is missing:

```bash
S=.claude/skills/ui-ux-pro-max/scripts/search.py
python3 $S "car rental luxury travel" --domain color -n 2
python3 $S "elegant premium serif sans luxury" --domain typography -n 3
python3 $S "local service hero testimonials pricing booking cta" --domain landing -n 3
python3 $S "color contrast text readable" --domain ux -n 2
python3 $S "touch target size 44px" --domain ux -n 2
python3 $S "reduced motion animation" --domain ux -n 2
python3 $S "scroll reveal stagger" --domain gsap -n 2
python3 $S "image font metadata seo" --stack nextjs -n 4
```

**Verify fit before applying anything (the skill requires this).** During the audit, `--design-system "travel agency vehicle fleet towing service premium"` returned *Aurora UI* + a sky-blue/orange palette + *Noto Sans Thai*. That is a **mismatch** for a navy/gold brand serving Andhra Pradesh, so do not adopt it. Use the skill's UX rules, GSAP tier, landing pattern and Next.js stack guidance. Record any rejected result in one line in your summary. Do not persist unverified output. Never pass `--force` to `--persist` without asking me.

If you want a design-system file for future sessions, generate it with `--design-system --persist -p "Sriram Travels" --output-dir .` using a query whose top result actually fits (premium dark + gold, automotive/service). Check that the returned style, palette and typography make sense first.

## 2. Audit findings (measured on the current code, not opinions)

Fix these. Evidence is included so you can confirm each before changing it.

### A. Accessibility (critical)
1. **Text contrast fails WCAG AA (4.5:1) in 11 places on light surfaces.** Measured ratios:
   - `.fleet-list-no` #a0a09a on #edeae3 → **2.19**
   - `.service-num` #99968e on #f5f3ee → **2.66**
   - `.fleet-disclaimer` #96938b → **2.77**
   - `.fleet-list-name small` #8b8b86 → **2.85**
   - `.fleet-sidebar-foot` #8b8170 → **3.19**
   - `.trust-item small` #7b8189 on #eeebe4 → **3.30**
   - `.service-card p` #777d84 → **3.75**
   - `.spec-list span` #737982 on #edeae3 → **3.65**
   - `.section-heading>p` #727783 → **4.04**
   - `.dark-eyebrow` #74726b → **4.34**
   - gold italic `em` in `.section-heading h2 em` #a88750 → **3.03**
   - Gold `#c9a96e` on paper is only **2.02**. That also fails the 3:1 needed for borders and icons that carry meaning (service arrow buttons, spec icons, text-link underline, brand mark).
2. **Microscopic type.** `globals.css` has 94 `font-size` px declarations. **72 are under 12px, 52 under 10px, the smallest is 6px**, and many are 7 to 8px uppercase letter-spaced labels. Body copy is 11 to 12px. The skill's rule is a minimum of 16px for body text on mobile.
3. **Targets below recommended size.** Scroll icon 24px, fleet prev/next 34px, service arrow link 32px desktop / 28px mobile, header CTA 38px / 34px on mobile, menu toggle ≈31px. WCAG 2.2 AA floor is 24px; the project standard should be **44×44px for primary mobile controls**.
4. **Mobile menu toggle** has no `aria-expanded` / `aria-controls`, no Escape-to-close, no focus management. There is **no skip-to-content link**.
5. Fleet selector: changing vehicle swaps the feature panel with no live announcement for screen readers. `chooseVehicle` also calls `scrollIntoView` on every prev/next press, which yanks the page even when the user is already looking at the fleet.
6. A global `em{...}` rule restyles every `<em>` in the document (Georgia italic gold). Replace with a scoped class.

### B. Performance
7. **All images are remote Unsplash URLs rendered with `unoptimized`** (three `<Image unoptimized>` usages in `page.tsx`: hero, fleet feature, manifesto; the fleet URLs live in `site.ts`), so Next.js cannot resize, convert to AVIF/WebP or cache them. There is no `public/` folder.
8. **Stock photos are reused**: the hero and the Innova Crysta and Toyota Fortuner cards all use the same photo (`photo-1519641471654`). Fleet cards for different vehicles showing the same car undermines trust.
9. Fonts load via a render-blocking CSS `@import` from Google Fonts. Use `next/font` (self-hosted, zero layout shift).
10. The entire page is one `"use client"` component. Only the GSAP effects, the fleet selector and the mobile menu need to be client-side.
11. GSAP `gsap.from(...)` hides content until JavaScript runs. The skill's GSAP guidance says not to ship below-the-fold content invisible by default without a no-JS fallback.

### C. Conversion and UX gaps
12. **Every WhatsApp CTA sends the same generic message**, including "Enquire about this vehicle", which never mentions the vehicle.
13. No enquiry form or structured quote request (pickup place, date, trip type, vehicle, passengers). Contact is only WhatsApp or phone.
14. **Towing is half the business but appears as one of three cards.** It has no dedicated emergency block, no "what to tell us when you call", no service-area statement.
15. No FAQ, no real reviews or social proof, no service area, no pricing guidance (even "from ₹X/km, confirm on call" style ranges), no opening or availability statement beyond the unverified "Day or night".
16. The hero has a 6-dot vertical indicator (`.visual-index`) and "01 / JOURNEY" that imply a slideshow that does not exist. Misleading affordance.
17. Metadata is minimal: no Open Graph / Twitter image, no icons, no canonical, no `robots`/`sitemap`, no `LocalBusiness` JSON-LD. `not-found.tsx` uses inline styles and ignores the design system.
18. Tailwind is installed and configured (`ink`, `gold`, `paper`) but the page uses only hand-written class names, so it is effectively dead config.

## 3. What to build (in this priority order)

Follow the skill's priority order: Accessibility → Touch → Performance → Style → Layout → Typography/Color → Animation → Forms → Navigation.

### Step 1: Design tokens (replace raw hex scattered through the CSS)
Add semantic tokens in `:root` and mirror them in `tailwind.config.ts` via `var(--token)`. Keep the visual look. Values below are pre-checked for contrast:

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--ink` | #111b2b | primary text, dark surfaces | 15.6 on paper |
| `--text-muted` | #5a6170 | secondary text on light | 5.61 on paper, 5.17 on #edeae3 |
| `--gold` | #c9a96e | gold **on dark** surfaces, decorative fills | 7.72 on ink |
| `--gold-deep` | #7a5a22 | gold **text, borders, icons on light** | 5.72 on paper, 5.28 on #edeae3 |
| `--on-gold` | #111b2b | text on gold buttons | 7.72 |

Rules: no gray lighter than `--text-muted` for text on light backgrounds. Gold `em` accents on light sections use `--gold-deep`. Keep the existing paper/ink/gold surfaces.

### Step 2: Type scale and fonts
- Load **Manrope** (headings), **DM Sans** (body) and **one serif italic for accents** (the skill's "Luxury Serif" pairing suggests **Cormorant**; Georgia is not guaranteed on Android, so load a real font) with `next/font/google`, `display: "swap"`, exposed as CSS variables. Remove the `@import`.
- Scale: body **16px** (line-height 1.6), lead/hero description **17 to 18px**, buttons **14 to 15px**, nav **14 to 15px**, uppercase eyebrow/label text **minimum 12px** with 0.12em max tracking. Remove every 6 to 9px declaration. If a label does not fit at 12px, shorten the copy or drop it.
- Keep headline sizes (`clamp`) but check they do not overflow at 320px.

### Step 3: Components and structure
Split `page.tsx` into `src/components/`: `Header`, `Hero`, `TrustStrip`, `Fleet`, `Manifesto`, `Services`, `TowingEmergency`, `Enquiry`, `Faq`, `Contact`, `Footer`, `StickyContactBar`, and a small client-only `Reveal`/motion wrapper. Everything static stays a **server component**; only `Fleet` (selection state), `Header` (menu state) and motion wrappers are `"use client"`. Keep the existing custom CSS (do not rewrite to Tailwind utilities), but split it logically and use tokens. Remove dead Tailwind config only if you confirm nothing uses it, otherwise wire tokens into it.

### Step 4: Mobile-first conversion layer
- **Sticky contact bar (mobile):** replace the single "Call" bar with two equal buttons, **Call** and **WhatsApp**, each ≥48px tall, with `padding-bottom: env(safe-area-inset-bottom)`. Add matching bottom padding to the footer so nothing is covered.
- **Header (mobile):** keep logo + one primary action (Call). The toggle becomes a 44×44 button with `aria-expanded`, `aria-controls`, Escape closes, focus returns to the toggle, and the menu locks body scroll while open.
- **Skip link** as the first focusable element.
- **Per-context WhatsApp messages:** build a helper `buildWhatsAppUrl({ vehicle?, service?, pickup?, date?, passengers? })`. "Enquire about this vehicle" must include the vehicle name; towing CTAs must use a towing-specific message ("I need vehicle recovery at [location]").
- **Enquiry form** (no backend needed): visible labels (never placeholder-only), fields for name, phone, trip type (local / outstation / group / towing), pickup location, date, vehicle (prefilled from the selected fleet item), passengers. Inline validation next to each field, correct `inputmode`/`autocomplete`, 48px inputs, 16px text (prevents iOS zoom). On submit, open WhatsApp with a composed message. No data is stored or sent anywhere else.
- **Towing block:** dedicated section with a large tap-to-call button, "What to tell us" 3-step checklist (location, vehicle type, what happened), and a clear "Service area" line (owner to confirm).

### Step 5: Content and trust (do NOT invent facts)
- **Never fabricate reviews, ratings, fleet counts, prices, years in business, licences or "24/7" claims.** Where the owner must supply data, render a clearly marked TODO in code comments and show nothing wrong on the page.
- Add a **Reviews** section that renders only real, owner-supplied reviews from a typed array in `src/data/site.ts`. If the array is empty, render a "See our reviews on Google" link slot (owner to provide the URL) or hide the section. Follow the skill's landing pattern: social proof *before* the final CTA, with name and detail, and pause/previous/next controls if it ever becomes a carousel.
- Add an **FAQ** (native `<details>/<summary>` or an accessible accordion): booking process, outstation vs local, driver included, towing coverage, payment, cancellation. Answers must be marked in code as "owner to confirm" until verified.
- Add a **pricing-guidance line** only if the owner supplies numbers; otherwise "Get a quote in minutes on WhatsApp".
- Replace stock photos with the owner's real vehicle photos in `public/fleet/` (WebP/AVIF, 1600px max, with explicit `width`/`height`). Until then, use **distinct** stock images per vehicle and keep the "images are illustrative" note at **12px+ and readable**.
- Remove or make functional the misleading hero decorations (`.visual-index` dots, "01 / JOURNEY").

### Step 6: Images and performance
- Remove `unoptimized`. Use local images through `next/image` with accurate `sizes`. Hero image gets `priority`; everything below the fold lazy loads (default). Reserve space with aspect-ratio so Cumulative Layout Shift stays < 0.1.
- If any remote image must remain, add `images.remotePatterns` in `next.config.ts`.
- Target: Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. State the scores you actually measured; do not claim numbers you did not run.

### Step 7: Motion (GSAP) the skill's way
- Use the skill's **Subtle scroll-reveal tier**: `y` offset **8 to 16px**, duration **0.3 to 0.4s**, `power1.out`, `start: "top 90%"`.
- Wrap in `gsap.matchMedia()` for `(prefers-reduced-motion: reduce)` so the final readable state renders immediately (already partly done; make it complete).
- **Content visible without JS**: add a `js` class on `<html>` before paint and apply the initial hidden state only under `.js`, or use CSS `@media (scripting: enabled)`. Never leave text invisible when scripts fail.
- Remove the hero-orb parallax scrub on mobile, and limit simultaneous animation to 1 to 2 key elements per view.
- Keep transitions at 150 to 300ms for hover and press feedback and give every clickable element `cursor: pointer`. Also add `:active` states, which matter on touch.

### Step 8: SEO and metadata (Next.js metadata API)
- Extend `metadata` in `layout.tsx`: `metadataBase`, `openGraph` (title, description, `images`), `twitter`, `alternates.canonical`, `robots`, `icons`. Add `opengraph-image.tsx` (navy/gold brand card).
- Add `LocalBusiness` (and `AutomotiveBusiness`/`TaxiService` if accurate) **JSON-LD** with name, area served, telephone and address from `src/data/site.ts`. Only include fields the owner confirmed.
- Add `app/sitemap.ts` and `app/robots.ts`.
- Restyle `not-found.tsx` with the real design tokens and a Call/WhatsApp fallback.

### Step 9: Optional (propose, don't silently build)
- **English/Telugu toggle.** The local audience likely benefits from Telugu. Propose a simple dictionary-based approach (`src/data/i18n.ts`) and ask me before building it, since it needs reviewed translations.

## 4. Constraints

- Keep Next.js 15, React 19, TypeScript strict, GSAP, lucide-react. Do not add heavy dependencies; use none unless justified in one line.
- Preserve existing phone/WhatsApp values from `src/data/site.ts` (the README says the owner must verify them). Do not change them.
- SVG icons only (lucide-react). No emoji as icons.
- No horizontal scroll at 320, 375, 768, 1024, 1440px. Test all five.
- Do not remove the `prefers-reduced-motion` handling.
- Work on a branch (`feat/ui-ux-overhaul`), never push to `main`; commit in logical steps (tokens → type → components → conversion → images → motion → SEO).
- CI runs `npx tsc --noEmit` and `npm run build`. Both must pass; also run `npm run lint`.

## 5. Acceptance checklist (run it, then report results)

- [ ] Every text/background pair ≥ 4.5:1 (list any exceptions and why). Non-text UI (borders, icons) ≥ 3:1.
- [ ] No `font-size` under 12px anywhere; body 16px.
- [ ] All primary mobile controls ≥ 44×44px; nothing below 24×24px.
- [ ] Keyboard-only walkthrough works: skip link, nav, menu, fleet selector, form, FAQ; focus ring always visible and never hidden behind the sticky header (`scroll-padding-top` still correct).
- [ ] Screen reader: fleet change announced (`aria-live="polite"` region), menu toggle exposes state, form errors tied to fields.
- [ ] Reduced motion: page fully readable, no scroll-scrub, no parallax.
- [ ] JS disabled: all text is visible.
- [ ] No `unoptimized` images; hero uses `priority`; CLS < 0.1.
- [ ] "Enquire about this vehicle" WhatsApp message contains the vehicle name.
- [ ] Works at 320 / 375 / 768 / 1024 / 1440px with no horizontal scroll.
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass.
- [ ] No invented reviews, prices, counts or claims; all owner-to-confirm items listed in your summary.

## 6. Final response format

Reply with: (1) what changed, grouped by the 9 steps; (2) before/after contrast and font-size numbers; (3) Lighthouse scores you actually measured; (4) the list of items the owner must supply or confirm (real photos, review links, service area, prices, hours, FAQ answers, towing availability); (5) any skill search results you rejected as a poor fit, and why.
