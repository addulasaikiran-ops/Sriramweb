# Fleet photo slots

Replace each SVG placeholder with an optimized photo of the actual vehicle. Keep filenames or update `image` in `src/data/site.ts` (planned central config: `src/data/fleet.ts`). Prefer WebP/AVIF, crop consistently, and use images you own or have permission to publish. The UI uses `next/image` with responsive `sizes`; fleet images should remain lazy-loaded and only the above-the-fold hero should be prioritized.
