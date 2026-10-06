# Game variants — round 2

Date: Oct 5, 2026
Status: **approved by Gokul** ("Ship all six", Oct 5, 2026). Implementation in progress.

Follows the round-1 plan (`2026-10-05-game-variants.md`), which shipped
Counting, Addition (Number Hero) and Flags Sprint, US States (World Explorer).
This round ships the previously-not-picked options plus two fresh ones.

## Variants

### Number Hero (`gokulmenon/number_hero`, branch `main`, vanilla HTML)

All four reuse `words.js` (EN/ES/HI number dictionaries), `audio.js`
(Gemini-TTS client), and the `counting.html`/`addition.html` game shell
(10 rounds, 3 big choices, streak, star screen, Say It button, ≥44px targets).

1. **Missing Number** — `missing-number.html`
   "2, 4, 6, ?" — tap the number that comes next. Sequences: +1, +2, +5, +10.
2. **Bigger or Smaller** — `bigger-smaller.html`
   Two big numbers, tap the bigger one (alternates: tap the smaller).
3. **Subtraction** — `subtraction.html`
   Clone of `addition.html` with take-away; minuend ≥ subtrahend so answers
   stay non-negative. Spoken equation via `getAdditionSpeech`-style helper.
4. **Number Bonds** — `number-bonds.html`
   "7 + ? = 10" — pairs that make 10 (later 20). Same shell as addition.

### World Explorer (`gokulmenon/world_explorer`, branch `main`, Expo)

5. **Capitals** — `app/capitals.tsx`
   `data/capitalsData.ts`: capital for each of the 40 `flagsPool` countries.
   `components/CapitalsScreen.tsx`: country name → 4 capital buttons, timed
   rounds, reuses StatusBar / FeedbackDialog / VictoryModal (same pattern as
   FlagsSprintScreen). Landing screen with instructions.
6. **US Capitals** — `app/us-capitals.tsx`
   `data/usStateCapitals.ts`: capital for each of the 50 states.
   `components/USCapitalsScreen.tsx`: state name → 4 capital buttons, timed.
   Landing screen with instructions.

## Homepage (`gokulmenon/homepage`, branch `master`)

- 6 registry entries in `data/games.json` (sortOrder 14–19), all `href`-style
  deep links — no new `next.config.js` rewrites (existing `/:path*` rules
  already proxy subpaths):
  - `/games/number-hero/missing-number`
  - `/games/number-hero/bigger-smaller`
  - `/games/number-hero/subtraction`
  - `/games/number-hero/number-bonds`
  - `/games/world-explorer/capitals`
  - `/games/world-explorer/us-capitals`
- 6 new 16:9 thumbnails under `public/images/games/` (headless Firefox).
- Supabase migration: insert the 6 rows (`href` column already exists).
- No changes needed to `lib/games-registry.js` / `pages/games/index.js`
  (href mechanism + self-healing refetch from round 1 handle variants).

## Verification (per variant)

- Game repo: file lands on `main`, Vercel deploy serves the route (HTTP 200),
  headless-Firefox screenshot proves it renders.
- Homepage: `npm run build:local` green, push, production `/games` shows
  19 games, each deep link returns 200 through `gokulmenon.com`.
