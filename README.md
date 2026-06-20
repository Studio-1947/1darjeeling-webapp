
# 1darjeeling

"Made in Darjeeling. Made for Darjeeling." — a long-scroll guide to homestays,
hotels, drivers & routes, attractions, seasonal produce, culture, and travel
tips for Darjeeling.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (CSS-first config — see `src/index.css`, no `tailwind.config.js` needed)
- **GSAP + ScrollTrigger** for scroll-driven reveals and the hero parallax
- **Lenis** for smooth-scroll, synced to GSAP's ticker so ScrollTrigger stays accurate

## Running it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/      one file per section (Hero, Attractions, Stays, etc.)
  data/             content as typed arrays — edit these to change copy
  hooks/useLenis.ts smooth-scroll setup
  lib/gsap.ts       registers ScrollTrigger once, re-exported everywhere
```

## What's real vs. placeholder

- **Attractions, routes, produce calendar, culture & festivals, travel tips**
  are written from real facts about Darjeeling (the toy train, Tiger Hill,
  tea flushes, local communities, etc.) — check current details (permits,
  train booking, road conditions) before publishing, since these change.
- **Homestays/hotels listings (`src/data/stays.ts`)** are sample/template
  entries, not real businesses. Swap them for verified local partners before
  this goes live — the card layout and filter chips will work as-is with
  real data.
- **Driver fares** are intentionally left out of the routes table (rates
  fluctuate) — there's a note pointing people to confirm with drivers
  directly instead.

## Ideas for next steps

- Real photography (the design currently leans on SVG ridgelines + flat
  color rather than stock photos — swap in real shots of stays/attractions
  if you want a more photo-led feel for the Stays and Attractions cards)
- A contact/booking form for the homestays once you have real partners
- Swap the Google Fonts `@import` for self-hosted fonts before going to
  production (faster, no third-party request)
