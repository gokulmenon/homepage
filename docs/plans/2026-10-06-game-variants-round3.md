# Plan — Game variants round 3 (9 new)

Approved variant list (Gokul, Oct 6, 2026). Bundling: 3 pushes total
(number_hero, world_explorer, homepage) to minimize Vercel build CPU.

## number_hero — 5 new HTML games (ONE push)

Pattern: single self-contained HTML file per mode, 10 rounds,
score + streak, 4-option (or tap) answering, Tailwind CDN.
**No audio, no language toggle** in new games (matches Oct 6 direction).

1. `telling-time.html` — "Telling Time"
   SVG analog clock, "What time is it?" Rounds 1–5: on-the-hour and
   half-hour; rounds 6–10: quarter hours. 4 digital-time options.

2. `counting-coins.html` — "Counting Coins"
   2–4 US coins as labeled circles (penny 1¢ brown, nickel 5¢, dime 10¢,
   quarter 25¢ silver). "How much money?" 4 cent-amount options.

3. `skip-counting.html` — "Skip Counting"
   5-term sequence with one blank (2s/5s/10s early, 3s/4s later).
   4 options.

4. `number-order.html` — "Number Order"
   5 shuffled numbers; tap in ascending order. Correct tap locks green
   with its position; wrong tap shakes (no score penalty, HTML idiom).

5. `odd-even.html` — "Odd & Even"
   9-number grid; "Tap all the EVEN numbers" (alternates odd/even by
   round). Round completes when all targets tapped.

QA: local http.server + scripted Firefox (answer clicks, no JS errors).

## world_explorer — 4 new quiz routes (ONE push)

Pattern: CapitalsScreen 4-option quiz (10 timed rounds, −100 wrong with
dialog, Try Again stays). New data files + screens + expo routes:

1. `/continents` — `data/continentsData.ts` (~40 countries → continent),
   `ContinentsScreen.tsx`. "Which continent is Egypt in?"
2. `/landmarks` — `data/landmarksData.ts` (~24 emoji landmarks → country),
   `LandmarksScreen.tsx`. "🗼 Eiffel Tower is in…?"
3. `/currencies` — `data/currenciesData.ts` (~30 countries → currency),
   `CurrenciesScreen.tsx`. "Japan uses the…?"
4. `/languages` — `data/languagesData.ts` (~30 countries → language),
   `LanguagesScreen.tsx`. "In Brazil they speak…?"

Each gets a start screen (app/*.tsx) with mode copy.
QA: `tsc --noEmit` + scripted Firefox gameplay per route.

## homepage — registry + thumbnails (ONE push)

- `data/games.json`: 9 entries
  (telling-time, counting-coins, skip-counting, number-order, odd-even,
  continents, landmarks, currencies, languages) with hrefs, sort order,
  thumbnails.
- `supabase/migrations/20261006XXXXXX_games_round3_variants.sql`: 9 rows.
- 9 thumbnails in `public/images/games/` captured locally via Firefox
  (http.server for number_hero, expo dev for world_explorer).
- Pre-push: `npm run build:local` + unmocked `npm run build`;
  `rm -rf build` before snapshot push.

## Push order

1. number_hero → verify 5 URLs 200
2. world_explorer → verify 4 routes 200
3. homepage → verify hub shows 28 games, all live
