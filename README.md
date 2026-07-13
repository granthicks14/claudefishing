# Coppell Area Fishing Guide

A web app that helps anglers around Coppell, TX pick a spot and get, for each species there, the best place to target within that spot, the best method/bait, and the best time to go today — using live weather and moon/solunar data plus a curated local knowledge base.

## What it does

1. Pick a fishing spot near Coppell (Grapevine Lake dam tailrace, the Grapevine Lake shoreline at Murrell/Meadowmere Park, the Elm Fork Trinity River through Coppell, or the neighborhood park ponds).
2. The app pulls live weather (temperature, wind, pressure trend, cloud cover) from [Open-Meteo](https://open-meteo.com/) and computes today's moon phase and estimated solunar feeding windows client-side.
3. For every species known to live at that spot, it combines that live data with a hand-built knowledge base (structure to fish, methods, baits, seasonal patterns) to recommend:
   - The best specific spot/structure to fish for that species
   - The best method and bait/lure
   - Today's best time windows (dawn/dusk plus estimated solunar major/minor periods), adjusted for current conditions
   - Extra tips: moon phase context, wind/pressure-driven presentation advice, safety notes, and licensing reminders

If live weather can't be reached, the app falls back to seasonal-average conditions (with a locally computed sunrise/sunset) so recommendations still work offline — it flags clearly when it's doing this.

## Development

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check and build for production
```

## Tech

React + TypeScript + Vite, no backend — weather comes straight from Open-Meteo's free API and moon-phase/solunar/sunrise-sunset math is computed client-side, so it can be deployed as a static site anywhere.
