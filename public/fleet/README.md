# Fleet photo slots

Replace these temporary SVG illustrations with photographs owned by Sriram Travels.

## Files used by the website
- `etios-placeholder.svg` — Toyota Etios
- `innova-placeholder.svg` — Toyota Innova
- `ertiga-placeholder.svg` — Maruti Suzuki Ertiga
- `urbania-placeholder.svg` — Force Urbania (also used in the hero)
- `traveller-12-seat-placeholder.svg` — first Force Traveller entry
- `traveller-large-placeholder.svg` — second Force Traveller entry

When replacing a slot, either keep the same filename (and update the extension in `src/data/site.ts` if needed) or update the corresponding `image` field there. Prefer compressed WebP/AVIF images sized for the rendered card. The website uses Next.js `Image`; fleet images are lazy-loaded by default, while the hero image is prioritized.
