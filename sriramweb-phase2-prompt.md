# Prompt: Phase 2 UI/UX fixes for Sriram Travels (remaining work only)

Paste everything below this line into Claude Code with the Sriramweb repo open. A first-phase prompt (`sriramweb-ui-improvement-prompt.md`) already exists in the repo; this one covers only what is still undone, based on a re-verified audit of `main` at commit `e1c1c91`.

---

## 0. Role

You are a senior front-end engineer and accessibility specialist. Finish the UI/UX overhaul of the Sriram Travels landing page (Next.js 15, React 19, TypeScript strict, GSAP, lucide-react, custom CSS in `src/app/globals.css`). Keep the navy `#111b2b` / gold `#c9a96e` / paper `#f5f3ee` brand and the existing cinematic-journey, FAQ, destinations and booking sections. Fix craft, accessibility and trust problems; do not redesign.

Use the installed UI UX Pro Max skill (`.claude/skills/ui-ux-pro-max/`; if missing, run `npx ui-ux-pro-max-cli init --ai claude`). Verify every search result fits before applying it. A design-system search for this business returned an unrelated sky-blue "Aurora UI" style, which must be rejected.

## 1. Verified current state of `main` (measured, not assumed)

| Check | Result |
|---|---|
| `npx tsc --noEmit` | passes |
| `npm run lint` | 0 errors, 1 warning (`eslint.config.mjs`: anonymous default export) |
| `npm run build` | passes (`/` = 58.8 kB, 162 kB first-load JS) |
| `font-size` px declarations | 115 total, **82 under 12px**, **58 under 10px**, smallest **6px** (it was 72 of 94 before; it got worse) |
| Light-surface text colours failing 4.5:1 | **14 selectors measured** (e.g. `.trust-item small` 3.54, `.service-card p` 3.75, `.spec-list span` 3.96, `.fleet-rate strong` 3.65, orange `#b86a24` accents 3.69), plus legacy greys `#a0a09a`, `#99968e`, `#96938b`, `#8b8b86`, `#8b8170`, `#a88750` still present |
| `unoptimized` images | 3 in `page.tsx`, **plus 7 remote Unsplash URLs inside `globals.css`** (cinematic backgrounds) |
| Duplicate photos | hero = Toyota Innova photo; **Force Urbania (03) = Force Traveller 17+ (06)** share one photo |
| Tokens | `--text-muted` and `--gold-deep` do not exist; `:root` has only the original vars |
| Fonts | still CSS `@import` from Google Fonts; no `next/font` |
| Structure | single 271-line `"use client"` `page.tsx`; no `src/components/`; no `public/` |
| Menu a11y | toggle has only `aria-label`: no `aria-expanded`, `aria-controls`, Escape, focus return; no skip link; no `aria-live` for fleet changes |
| Mobile bar | Call only (no WhatsApp), no `env(safe-area-inset-bottom)` |
| Tap targets | `.fleet-controls button` 34px (29px mobile), `.service-card>a` 32px (28px), `.header-cta` 38px (34px), `.scroll-icon` 24px (21px), `.menu-toggle` ~31px |
| Forms | none (`<form>`/`<label>` count: 0) |
| Reviews | none (correct: do not invent them) |
| SEO | has title template, description, keywords, OG/Twitter text, robots, `lang="en-IN"`. **Missing**: `metadataBase`, OG image, canonical, icons, `sitemap`, `robots.ts`, JSON-LD |
| Hero decoration | `.visual-index` 6-dot indicator and "01 / JOURNEY" remain (imply a slideshow that does not exist) |
| Motion | `window.matchMedia` early return only; no `gsap.matchMedia`; reveal `y: 32`/`46`; many scrub effects plus a pinned 4-chapter scroll-jacking section |

Strict score on the 17-item checklist (Done = 1, Partial = 0.5, Not started = 0, Partial only when a requested sub-item is actually on `main`): **Q done; I, L, O partial; everything else not started = 2.5 / 17 = 14.7%.**

**Unmerged work exists.** Branch `fix/accessibility-reduced-motion` (3 commits, 0 behind `main`) adds a skip link, `aria-expanded`/`aria-controls` on the menu toggle and FAQ, a 3px focus ring, `env(safe-area-inset-bottom)` on `.mobile-call`, a reduced-motion fallback for the cinematic section, and reduced-motion-aware `scrollIntoView`. If merged, G moves to partial and the score becomes about 17.6%.

**Do not trust an earlier audit's claims where they conflict with the table above.** That audit could not run commands; two of its statements were wrong: it reported 46 sub-12px declarations (actual 82) and said the two Force Traveller entries share a photo (actual: Urbania and Traveller 17+).

## 2. Work order

Create branch `feat/ui-ux-phase-2` from `main`. Commit in logical steps. Never push to `main`.

### Step 1: Land the accessibility branch (highest value, smallest effort)
- Review `origin/fix/accessibility-reduced-motion`, merge or cherry-pick it onto your branch, and resolve any conflicts.
- Then complete what it does not cover: Escape closes the menu and returns focus to the toggle; menu locks body scroll while open; a visually hidden `aria-live="polite"` region announces fleet changes ("Showing Toyota Innova, 2 of 6"); `chooseVehicle` must not `scrollIntoView` when the fleet is already in view; scope the global `em{...}` rule to a class.
- Use `gsap.matchMedia()` for `(prefers-reduced-motion: reduce)` instead of the single early return, and make sure no element is left hidden (`autoAlpha: 0`) when reduced motion or JS is unavailable.

### Step 2: Tokens and contrast
Add to `:root` and mirror in `tailwind.config.ts` via `var(--token)`. Values are pre-checked:

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--text-muted` | #5a6170 | secondary text on light | 5.61 on paper, 5.17 on #edeae3 |
| `--gold-deep` | #7a5a22 | gold text, borders, icons on light | 5.72 on paper, 5.28 on #edeae3 |
| `--accent-orange-deep` | choose and verify ≥ 4.5 | replaces `#b86a24` text on light | must be computed |

Replace every light-surface grey/gold/orange text colour with these tokens. Keep `#c9a96e` gold on dark surfaces only. Re-run a WCAG script (`python3 -I`, script outside the repo) over every text/background pair, including text over images and gradients (check against the darkest and lightest part of the overlay), and fix until no pair is below 4.5:1 (large text 3:1) and UI borders/icons are at least 3:1.

### Step 3: Type scale
- Body 16px; lead copy 17 to 18px; buttons and nav 14 to 15px; uppercase labels, eyebrows, captions, badges **minimum 12px**, tracking at most 0.12em.
- Remove every declaration under 12px (82 today, including 6 to 9px in media queries). Where a label cannot fit, shorten the copy.
- Replace the CSS `@import` with `next/font/google` for Manrope, DM Sans and one real serif italic (Cormorant is the skill's "Luxury Serif" suggestion; Georgia is not guaranteed on Android).

### Step 4: Touch targets and the mobile contact bar
- All primary mobile controls at least 44×44px (fleet prev/next, service arrow links, menu toggle, header CTA); nothing below 24×24px. Enlarge the hit area with padding or a pseudo-element if the icon must stay small.
- Replace the single "Call" bar with **Call + WhatsApp**, each at least 48px tall, with `padding-bottom: env(safe-area-inset-bottom)`; add matching footer padding.

### Step 5: Towing, forms and messages
- Add a dedicated **towing section** (not just service card 03): large tap-to-call button, "What to tell us" 3-step checklist (location, vehicle, what happened), a WhatsApp message built for recovery ("I need vehicle recovery. Location: ____ Vehicle: ____ Problem: ____"). Hours and coverage text is **owner-to-confirm**; do not state "24/7" or "Day or night" until the owner confirms.
- Add a client-side **enquiry form** (no backend): visible labels, inline errors next to fields, `autocomplete`/`inputmode`, 48px inputs at 16px font; fields: name, phone, trip type (local / outstation / group / towing), pickup, destination, date, vehicle (prefilled from the selected fleet item), passengers. On submit, open WhatsApp with the composed message. Nothing is stored or sent elsewhere.
- Extract a typed `buildWhatsAppUrl()` helper so every CTA carries context (vehicle, service, route).

### Step 6: Images and trust
- Remove `unoptimized`. Put images in `public/` (WebP/AVIF, max 1600px, explicit dimensions) and load with `next/image`; hero keeps `priority`. Move the 7 remote CSS background URLs into `next/image` or local files. Keep CLS under 0.1.
- Every vehicle gets a **distinct** image. Until the owner supplies real photos, use distinct stock photos and **restore a visible "Images are illustrative" note** (the previous disclaimer had it; the current one does not, so stock photos now appear as the actual vehicles).
- The disclaimer "Reference rates shown for design setup only" is developer wording shown to customers. Gate the price display behind `SHOW_RATES` in `src/data/site.ts` (default `false` until the owner confirms the rates). When shown, use customer wording: "Indicative rate · confirm on call".
- The "Air conditioning · Insurance · Leather interior" list is identical for all six vehicles. Treat it as unverified; show it only per vehicle once the owner confirms.
- Remove or make functional the fake hero indicators (`.visual-index`, "01 / JOURNEY").

### Step 7: Motion budget
- Keep the cinematic journey, but reduce load on mid-range phones: no pinned scroll-jacking below 768px (render the four chapters as a simple stacked list), drop the hero-orb and manifesto parallax on mobile, reveal offsets 8 to 16px, 0.3 to 0.4s, `power1.out`. At most 1 to 2 key moving elements per viewport.
- Content must be fully visible with JavaScript disabled.

### Step 8: Structure
Split `page.tsx` into `src/components/` (`Header`, `Hero`, `TrustStrip`, `Fleet`, `CinematicJourney`, `Destinations`, `BookingSteps`, `Faq`, `Manifesto`, `Services`, `TowingEmergency`, `EnquiryForm`, `Contact`, `Footer`, `StickyContactBar`, a `Reveal` wrapper). Only the pieces with state or GSAP are `"use client"`; static sections are server components. Keep the custom CSS but split it logically.

### Step 9: SEO completion
Add `metadataBase`, an `opengraph-image.tsx` (navy/gold brand card), canonical, icons, `app/sitemap.ts`, `app/robots.ts`, and `LocalBusiness` JSON-LD with only owner-confirmed fields (name, telephone, area served, address). Restyle `not-found.tsx` with the design tokens and Call/WhatsApp buttons. Fix the lint warning in `eslint.config.mjs`.

## 3. Rules

- Do not invent reviews, ratings, prices, counts, hours, licences or coverage. Leave clearly marked `// TODO(owner)` items.
- Preserve the phone/WhatsApp values in `src/data/site.ts`.
- No emoji as icons; lucide SVGs only. No horizontal scroll at 320, 375, 768, 1024, 1440px.
- CI runs `npx tsc --noEmit` and `npm run build`; both and `npm run lint` must pass.

## 4. Acceptance targets (report real measured numbers)

| Metric | Now | Target |
|---|---|---|
| `font-size` under 12px | 82 | 0 |
| Text pairs under 4.5:1 | at least 14 selectors | 0 |
| `unoptimized` + remote image URLs in code/CSS | 3 + 7 | 0 |
| Duplicate vehicle photos | 2 vehicles share 1 photo (hero also reuses Innova's) | 0 among fleet cards |
| Primary mobile targets under 44px | 5 controls | 0 |
| Components in `src/components/` | 0 | 12+ |
| `tsc`, `lint`, `build` | pass | pass, 0 lint warnings |

Also verify by hand: keyboard-only pass (skip link, menu, fleet selector, FAQ, form), reduced-motion pass, JavaScript-disabled pass, and screen-reader announcement of fleet changes. Report Lighthouse mobile scores only if you actually run Lighthouse.

## 5. Final response format

1. What changed, per step, with commit hashes.
2. The before/after table from section 4 with measured numbers.
3. Any search results from the skill you rejected, and why.
4. **Owner to-do list**: real vehicle photos and permission to publish them, confirmed per-km rates and what they include, seating per vehicle, which features each vehicle really has, service area and outstation routes, towing hours and coverage (is it really 24/7?), verified phone/WhatsApp, real customer reviews with permission, FAQ and cancellation terms, business address and logo for structured data.
