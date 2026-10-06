# Game Variants Plan — 2026-10-05

Status: **approved by Gokul** (Oct 5, 2026). **Implemented** Oct 5–6, 2026 —
all 4 variants live, registry entries + thumbnails shipped on the homepage.

## Goal

Add 4 new Games Arcade entries as variants of two existing games. Each variant
is a new page/route inside the game repo, deep-linked from the hub registry —
no new deployments, no new proxy rules.

## Repos & branches

| Repo | Branch | Stack | Deploys to |
|---|---|---|---|
| `gokulmenon/number_hero` | `main` | Vanilla single-file HTML + Tailwind CDN, Vercel serverless `api/audio.js` (Gemini TTS) | number-hero.vercel.app |
| `gokulmenon/world_explorer` | `main` | Expo Router + TypeScript, `expo export --platform web` | world-explorer-rose.vercel.app |
| `gokulmenon/homepage` | `master` | Next.js hub (this repo) | gokulmenon.com |

## Hub mechanism for variants

Each game's rewrite already proxies subpaths (`/games/<slug>/:path*` → the
game deployment), so a variant needs no new rewrite. Registry entries gain an
`href` field (full hub path, e.g. `/games/number-hero/counting`); the hub card
links `game.href || '/games/' + game.slug`. Variant entries carry **no**
`envName`/`defaultUrl`, so `next.config.js` skips rewrite generation for them
(the existing URL-less → skip path). Follow-up Supabase migration adds
`href text` to the `games` table.

## Variant 1 — Number Hero: Counting mode (small)

- **New file:** `counting.html` (~250 lines), modeled on `index.html`.
- **Gameplay:** each round shows N (1–10) random emoji objects (🍎🐝⭐…);
  kid taps the matching number from 3 big options. Correct → spoken number via
  the existing `/api/audio` (absolute URL, CORS `*` — zero API changes);
  wrong → gentle shake, try again. 10 rounds → star score screen, streak bonus.
- **Reuse:** extract `getEnglishWord`/`getSpanishWord`/`getHindiWord` (+
  `getTranslation`, `getLanguageName`) from `index.html` into shared `words.js`
  referenced by both pages; keep the EN/ES/HI language radios; reuse tile CSS.
- **Storage:** none in either page (verified — no localStorage use).

## Variant 2 — Number Hero: Addition mode (small)

- **New file:** `addition.html` (~250 lines), same shell as counting.
- **Gameplay:** "3 + 4 = ?" with 3 options; spoken equation via the audio API
  (`word=Three plus four`, `Tres más cuatro`, `Teen aur Chaar`). Sums 1+1–9+9.
- Shares `words.js` + quiz chrome with counting mode.

## Variant 3 — World Explorer: Flags sprint (medium)

- **New files:** `app/flags-sprint.tsx` (route, auto-registered by expo-router
  Stack), `components/FlagsSprintScreen.tsx`, `data/flagsData.ts`.
- **Flags:** no flag assets in the repo — use emoji flags (regional-indicator
  symbols from ISO-2 codes), zero assets, renders on iPad Safari. Curated
  40-country pool with explicit `{ name, code3, iso2 }` (repo pools use
  3-letter codes).
- **Gameplay:** 10 timed rounds — country name → 4 big flag buttons. Scoring
  reuses the GameScreen formula (base 1000, −10/sec, −100 wrong). Reuses
  `StatusBar`, `FeedbackDialog`, `VictoryModal`, `shuffleArray`.

## Variant 4 — World Explorer: US states mode (medium-large)

- **New files:** `data/usStates.ts` (50 states: name, abbr, label lat/lon),
  `components/USMap.tsx` (modeled on `WorldMap`, loads
  `https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json` via topojson-client
  — same pattern as the world-atlas map), `components/USStatesScreen.tsx`
  (tap-the-state, 10 states/run, timer, scoring, hints — modeled on
  `GameScreen`), route `app/us-states.tsx`.

## Homepage changes (after each variant is live)

- `data/games.json`: 4 entries — `number-hero-counting` (Math, 4+),
  `number-hero-addition` (Math, 5+), `world-explorer-flags` (Geography, 6+),
  `world-explorer-states` (Geography, 7+) — each with `href`, title,
  description, tags, and a fresh 16:9 thumbnail in `public/images/games/`
  (captured post-deploy via `~/workspace/thumbs/capture.js`).
- `pages/games/index.js`: card link → `game.href || '/games/' + game.slug`.
- Supabase: `alter table games add column href text` (follow-up migration).

## Order of operations (per variant)

1. Implement in the game repo → push to `main`.
2. Verify the variant on its deployment URL.
3. Capture the 16:9 thumbnail.
4. Add the registry entry + thumbnail to the homepage repo → push `master`.
5. Verify the hub card and the deep link through the gokulmenon.com proxy.
6. Gokul: iPad Safari touch pass.

## Risks

- New expo routes under the hub proxy ride the existing SPA-fallback
  mechanism (proven by the current game) — verify each route live.
- number_hero clean URLs (`/counting` vs `/counting.html`) — verify on
  Vercel; adjust `href` if needed.
- Pinned `gemini-2.5-flash-preview-tts` model may rot (known lesson) —
  deliberately out of scope.
