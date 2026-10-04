# Games Hub Migration Plan — Final (Reviewed)

**Status:** DRAFT — pending review by the Reviewer agent. Do not implement until the Reviewer agent approves.
**Author:** Jarvis (for Gokul Menon) · **Date:** 2026-10-04
**Scope:** Transform the `homepage` Next.js app into the central games hub for the kid's iPad games.
**Skill/account:** All homepage-repo work uses the `github-homepage` skill (`custom.github-homepage` credential, account `gokulmenon`). Never the `github` skill (that's the other account). Git identity: `Gokul Menon <catchgokul@gmail.com>`.

---

## 0. Reconciliation log — draft plan vs. code reality

Gokul's draft plan (reverse-proxy via Next.js rewrites, games stay in own repos) is **adopted as the architecture**.
The following corrections came from reading the actual source of `homepage` and all 9 game repos (surveyed at the SHAs in Appendix B):

| # | Draft plan claim | Code reality | Final decision |
|---|---|---|---|
| 1 | "Step 8: Deploy homepage to Vercel" (one checkbox) | `homepage` deploys to **Google App Engine** via `.github/workflows/deploy.yml` on push to `master` (`app.yaml`, `gcloud` auth, `GOOGLE_CLIENT_SECRET`). It is not on Vercel today. | New **Phase 0**: a real GAE→Vercel migration (project setup, env-var inventory in Appendix A, DNS cutover for gokulmenon.com, retire GAE workflow). |
| 2 | Gallery code uses `<Image layout="fill" objectFit="cover">` | `next@14.1.4` — the `layout` prop was removed in Next 13. The snippet **breaks the build**. | Use `fill` prop + `style={{objectFit:'cover'}}`. Corrected code in §3.3. |
| 3 | Add `<base href="/games/<slug>/">` to every game's `index.html` | Verified: **zero** absolute-path refs (`src="/…"`, `href="/…"`, `url(/…)`) in all 7 vanilla games, and every `api/…` fetch is already relative (`api/audio?…`, `api/words?…`, `api/fact?…`). | **No `<base>` surgery.** Relative URLs resolve correctly under `/games/<slug>/` through the proxy. Replace with a per-game audit checklist (§5). |
| 4 | Registry + rewrites cover 3 games (world-explorer, zero-hero, vocab-venture) | 9 game repos in scope (§5 table). | Registry and rewrites cover **all 9** from day one. |
| 5 | "Inject into the nav array in components/Header.js" | `Header.js` has **hardcoded `<li>`** nav items, no array. | Add one hardcoded `<li><Link href="/games">…` item (§3.2). |
| 6 | Two rewrite rules per game (exact + `:path*`) | Next.js `:path*` matches zero or more segments — the bare path is already covered. | One rule per game (§4). |
| 7 | Supabase SSO via `.gokulmenon.com` cookie plumbing | Under rewrite-proxying the browser never leaves `gokulmenon.com` — **all games share one origin**, so Supabase's default `localStorage` session is automatically shared. | Simplified: one Supabase project, default storage, no cookie work (§8). |
| 8 | Implies games use localStorage today | Verified: **no** `localStorage`/`sessionStorage` usage in any game repo. | Namespacing (`<prefix>_…`) is a forward convention for new games, documented in §7. |
| 9 | Thumbnails at `/static/images/games/*.png` | Those files don't exist. | Explicit thumbnail-generation step via Playwright screenshots (§3.4). |
| 10 | — | `toys-parking-lot` contains only `LICENSE` (empty hub placeholder from Jun 2026). | Out of scope; recommend archiving the repo after hub launch. |
| 11 | — | `monopoly` repo is double-nested (`monopoly/monopoly/` = Vite root) and its source has absolute refs (`/vite.svg`, `/src/main.jsx`) — fixed at build time via `base`. | Per-game note: set Vercel root directory to `monopoly`, add `base: './'` to `vite.config.js` (§5). |
| 12 | — | `world_explorer` is Expo SDK 54, `web.output: 'single'`, no `baseUrl` set. `experiments.baseUrl` exists in recent SDKs but is **unverified on this project**. | Try `experiments.baseUrl: "/games/world-explorer"` → `expo export --platform web`; fallback in §5 if assets 404. |

---

## 1. Architecture (confirmed)

```
                        homepage (Next.js 14, pages router)
                        https://gokulmenon.com/games
                                     |
        +----------------------------+----------------------------+
        |                            |                            |
  /games/<slug>/:path*        /games/<slug>/:path*         /games/<slug>/:path*
  (Next.js rewrite,            (Next.js rewrite,            (Next.js rewrite,
   server-side proxy)           server-side proxy)           server-side proxy)
        |                            |                            |
        v                            v                            v
  world_explorer               zero_hero                    vocab_venture …
  (Expo web, Vercel)           (static + /api, Vercel)      (static + /api, Vercel)
```

**Invariants**
- **Single origin:** the browser only ever sees `gokulmenon.com`. One `localStorage`/`sessionStorage`/cookie space for all games — no iPad Safari PWA pop-outs, no cross-origin auth hacks later.
- **Zero monolith merging:** game source stays in its own repo with its own Vercel deployment. `homepage` is the router + hub gallery only.
- **Pluggable:** a new game = Vercel deploy + one registry entry + one rewrite rule (§7).

**Trade-off accepted:** N independent Vercel projects to maintain (each with its own env vars) vs. a single monorepo deploy. Chosen for zero game-code changes.

---

## 2. Phase 0 — Migrate `homepage` from Google App Engine to Vercel (REQUIRED FIRST)

The draft plan skipped this; nothing else works without it.

1. Create Vercel project from `gokulmenon/homepage`, production branch `master`, framework preset Next.js.
   - Note: `next.config.js` sets `distDir: 'build'` — Vercel honors custom `distDir`; no change needed.
2. Migrate env vars (full inventory in Appendix A): `EMAIL_JS_*` (3), `RECAPTCHA_V2_SITE_KEY`, `SANITY_*` (4), `GOOGLE_ANALYTICS_ID`, `CLARITY_ID`, `YOUTUBE_API`. All `NEXT_PUBLIC_*` variants as before.
3. Cut over DNS for `gokulmenon.com` (+ `www`) to Vercel; verify the Sanity-backed pages (blog, photos, videos, podcasts) and contact form still work.
4. Retire the GAE path: disable/remove `.github/workflows/deploy.yml` (or keep the file with the workflow disabled) so pushes to `master` don't double-deploy to App Engine.
5. Confirm Vercel preview deployments work on PRs — the Reviewer agent will use these.

---

## 3. Phase 1 — Hub implementation (`homepage` repo)

### 3.1 `lib/games.js` — the registry (all 9 games)

```js
// homepage/lib/games.js — single source of truth for the hub
export const GAMES = [
  { id: 'memory-game',    slug: 'memory-game',    title: 'Memory Game',      category: 'Memory',   ageGroup: '4+', destinationUrl: 'https://memory-game-gokulmenon.vercel.app',    thumbnail: '/static/images/games/memory-game.png',    description: 'Classic card-match memory game.' },
  { id: 'snakes-ladders', slug: 'snakes-ladders', title: 'Snakes & Ladders', category: 'Board',    ageGroup: '4+', destinationUrl: 'https://snakes-and-ladder.vercel.app',           thumbnail: '/static/images/games/snakes-ladders.png', description: 'Roll, climb, slide — the classic board game.' },
  { id: 'trivia',         slug: 'trivia',         title: 'Trivia',           category: 'Quiz',     ageGroup: '5+', destinationUrl: 'https://trivia-game.vercel.app',                thumbnail: '/static/images/games/trivia.png',         description: 'Math, reading & geography trivia for kids.' },
  { id: 'number-hero',    slug: 'number-hero',    title: 'Number Hero',      category: 'Math',     ageGroup: '4+', destinationUrl: 'https://number-hero.vercel.app',               thumbnail: '/static/images/games/number-hero.png',    description: 'Learn numbers 1–100 in English, Hindi & Spanish, with spoken audio.', needsEnv: ['GEMINI_API_KEY'] },
  { id: 'zero-hero',      slug: 'zero-hero',      title: 'Zero Hero',        category: 'Math',     ageGroup: '6+', destinationUrl: 'https://zero-hero.vercel.app',                 thumbnail: '/static/images/games/zero-hero.png',      description: 'Big numbers, fun facts and spoken names.', needsEnv: ['GEMINI_API_KEY'] },
  { id: 'vowel-sounds',   slug: 'vowel-sounds',   title: 'Vowel Sounds',     category: 'Language', ageGroup: '4+', destinationUrl: 'https://vowel-sounds.vercel.app',               thumbnail: '/static/images/games/vowel-sounds.png',   description: 'Practice vowel sounds with chart and audio.' },
  { id: 'vocab-venture',  slug: 'vocab-venture',  title: 'Vocab Venture',    category: 'Language', ageGroup: '7+', destinationUrl: 'https://vocab-venture.vercel.app',             thumbnail: '/static/images/games/vocab-venture.png',  description: 'Word adventures with AI-generated lists and spoken audio.', needsEnv: ['GEMINI_API_KEY'] },
  { id: 'monopoly',       slug: 'monopoly',       title: 'Monopoly',         category: 'Board',    ageGroup: '8+', destinationUrl: 'https://monopoly-gokulmenon.vercel.app',        thumbnail: '/static/images/games/monopoly.png',       description: 'Monopoly deal-style card game (Vite + React build).', buildNote: 'vite build with base "./", root dir monopoly/' },
  { id: 'world-explorer', slug: 'world-explorer', title: 'World Explorer',   category: 'Geography', ageGroup: '7+', destinationUrl: 'https://world-explorer.vercel.app',            thumbnail: '/static/images/games/world-explorer.png', description: 'Explore world geography, flags and landmarks.', buildNote: 'expo export --platform web; verify experiments.baseUrl' },
];
```

`destinationUrl` values above are placeholders — the implementing agent fills in the real Vercel URLs after deploying each game repo. Prefer `process.env.NEXT_PUBLIC_<SLUG>_URL` overrides for flexibility.

### 3.2 Nav — `components/Header.js`

The nav is hardcoded; append one item inside the existing `<ul>`:

```jsx
<li><Link href="/games"><strong>Games</strong></Link></li>
```

### 3.3 `pages/games/index.js` — gallery page

Standalone page (not a Dimension article overlay — a full-bleed grid is the right UX for a kid on iPad). Reuses `Header`/`Footer`. **Corrected for Next 14** (`fill`, not `layout="fill"`):

```jsx
// homepage/pages/games/index.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { GAMES } from '../../lib/games';

export default function GamesHub() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      <Head>
        <title>Games Arcade | Gokul Menon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Games Arcade</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-400">Pick a game to play. Progress is saved on this device.</p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game) => (
            <Link key={game.id} href={`/games/${game.slug}`}
              className="group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/60 shadow-lg hover:border-indigo-500/80 transition-all duration-200 flex flex-col">
              <div className="relative w-full h-48 bg-gray-950 overflow-hidden">
                <Image src={game.thumbnail} alt={game.title} fill style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 right-3 bg-indigo-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{game.category}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">{game.title}</h2>
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2">{game.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>Ages {game.ageGroup}</span>
                  <span className="text-indigo-400 font-medium">Play Now &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

(`Header` renders the Dimension chrome; it accepts an optional `timeout` prop — default visible is fine here.)

### 3.4 Thumbnails

Generate per-game `public/static/images/games/<slug>.png` (1200×900) with Playwright screenshots at iPad viewport against each game's live Vercel URL. No hand-drawn placeholders — real screenshots.

---

## 4. Phase 2 — Rewrites (`next.config.js`)

One rule per game (`:path*` already matches the bare path):

```js
// homepage/next.config.js — add alongside existing config
async rewrites() {
  const { GAMES } = require('./lib/games.js'); // or keep an explicit list
  return GAMES.map((g) => ({
    source: `/games/${g.slug}/:path*`,
    destination: `${g.destinationUrl}/:path*`,
  }));
}
```

Notes:
- `destinationUrl` must be the **production** Vercel URL of each game (env-overridable).
- Rewrites are server-side: the browser stays on `gokulmenon.com` — origin, storage and future auth cookies are unified. (This is a rewrite, not a redirect — never use `redirects` here.)
- Keep the existing `images.domains` config; thumbnails are local so no remote-image config is needed.

---

## 5. Phase 3 — Per-game checklist

Do these in each **game repo** (own Vercel project per repo), then wire the real URL into the registry.

| Game | Type | Needs |
|---|---|---|
| `memory_game` | single `index.html` (36 KB) | Deploy as static. No changes needed (verified: relative refs only, viewport meta present). |
| `snakes-and-ladder` | single `index.html` (29 KB) | Same — deploy as static, no changes. |
| `trivia_game` | single `index.html` (100 KB) | Same — deploy as static, no changes. |
| `vowel_sounds` | `index.html` + `res/` (7 KB + assets) | Deploy whole repo as static; relative `res/…` paths already correct. |
| `number_hero` | `index.html` + `api/audio.js` | Deploy as static + serverless; set `GEMINI_API_KEY` env on its Vercel project. Fetches are already relative (`api/audio?…`). No `<base>` tag. |
| `zero_hero` | `index.html` + `api/audio.js` + `api/fact.js` | Same as above; `GEMINI_API_KEY` required. |
| `vocab_venture` | `index.html` + `api/words.js` + `api/audio.js` | Same as above; `GEMINI_API_KEY` required. |
| `monopoly` | Vite + React, root is `monopoly/monopoly/` | Vercel root directory = `monopoly`; add `base: './'` to `vite.config.js` (source has absolute `/vite.svg`, `/src/main.jsx` — build rewrites them with `base`). Then `vite build`. |
| `world_explorer` | Expo SDK 54, `expo export --platform web` | Try `experiments.baseUrl: "/games/world-explorer"` in `app.json`, re-export, verify `/_expo/…` assets load through the proxy. **Fallback if assets 404:** revert `baseUrl`, serve the export at its Vercel root and rely on the rewrite (asset URLs are the only risk — test explicitly). |

**Audit rule for every game (replaces the draft's `<base href>` step):** grep for `(src|href)="/`, `url(/`, and `fetch('/` — any hit with a leading slash must be made relative or it will resolve to `gokulmenon.com/…` and bypass the proxy. The 7 vanilla games are already clean (verified 2026-10-04).

`zombie-defense` (tower-defense, canvas + ES modules + touch) was in the original repo survey but is **not** in Gokul's 9-game list — treat as the first candidate for the §7 runbook, not Phase 3.

---

## 6. Phase 4 — iPad QA checklist

- [ ] Open `/games` on iPad Safari; every card shows a real thumbnail and links to `/games/<slug>`.
- [ ] Launch each game; verify no 404s for assets/audio/API calls (devtools or Vercel logs).
- [ ] Gemini-backed games (`number_hero`, `zero_hero`, `vocab_venture`): audio plays, words/facts load.
- [ ] Pinch-zoom/scroll behave (all games already ship `user-scalable=no` viewport metas — verified).
- [ ] Add `gokulmenon.com/games` to Home Screen; launches fullscreen standalone, games load inside it.

---

## 7. Phase 5 — Runbook: adding game #10+ (the extendability proof)

1. Build the game as **stateless** HTML/CSS/JS (any build tool OK — commit the static output).
2. **Storage convention:** all `localStorage`/`sessionStorage` keys namespaced `<slug>_…` (e.g. `zombie_defense_highscore`). No unprefixed keys — one shared origin means collisions are real.
3. All asset/API references **relative** (no leading `/`); audit with the grep rule from §5.
4. Deploy the game repo to Vercel (static; add `GEMINI_API_KEY` if it needs server AI).
5. Add one entry to `homepage/lib/games.js` + generate its thumbnail (§3.4).
6. Add one rewrite line (or rely on the registry-driven `rewrites()` in §4 — then this step is automatic).
7. iPad QA per §6.

---

## 8. Phase 6 — Future: OAuth + Supabase (deferred, design only)

Because every game is same-origin through the proxy, **no cookie plumbing is needed**: Supabase JS's default `localStorage` session is automatically visible to all games.

When ready:
1. New Supabase project; enable Google (and Apple) OAuth.
2. Hub implements sign-in; games include the Supabase JS CDN snippet and call `supabase.auth.getSession()` — it just works.
3. Long-term state: `game_states(user_id, slug, state jsonb, updated_at)` with RLS `auth.uid() = user_id`.
4. Migration path for today's local state: on first login, each game uploads its namespaced `localStorage` blob (§7 convention makes this mechanical).

---

## 9. Execution checklist

- [ ] **Phase 0:** Vercel project for `homepage`; env vars migrated (App. A); DNS cut over; GAE workflow retired; preview deploys verified.
- [ ] Deploy all 9 game repos to Vercel; set `GEMINI_API_KEY` on `number_hero`, `zero_hero`, `vocab_venture`; apply `monopoly`/`world_explorer` build notes.
- [ ] `lib/games.js` with real production URLs.
- [ ] `components/Header.js` — Games nav item.
- [ ] `pages/games/index.js` — gallery (Next-14-correct `Image`).
- [ ] `next.config.js` — registry-driven rewrites.
- [ ] Thumbnails generated → `public/static/images/games/`.
- [ ] Per-game audit grep clean (no leading-slash refs).
- [ ] iPad QA (§6) green.
- [ ] Archive `toys-parking-lot` (empty placeholder).

---

## Appendix A — `homepage` env vars to migrate to Vercel

From `.github/workflows/deploy.yml` (all currently GitHub Secrets → `app.yaml` env): `EMAIL_JS_SERVICE_ID`, `EMAIL_JS_TEMPLATE_ID`, `EMAIL_JS_USER_ID`, `RECAPTCHA_V2_SITE_KEY`, `SANITY_API_TOKEN`, `SANITY_PROJECT_ID`, `SANITY_DATASET`, `GOOGLE_ANALYTICS_ID`, `CLARITY_ID`, `YOUTUBE_API` (+ `NEXT_PUBLIC_*` variants as in the workflow). Game projects needing secrets: `GEMINI_API_KEY` on `number_hero`, `zero_hero`, `vocab_venture` only.

## Appendix B — Surveyed repo SHAs (2026-10-04)

`homepage@master 89270693`; `memory_game@main e9dd0619`; `monopoly@main 9032eab8`; `number_hero@main df777b9b`; `snakes-and-ladder@main df2efe13`; `toys-parking-lot@main 24c3e992` (LICENSE only); `trivia_game@main e2daf51b`; `vocab_venture@main 08ca3bdc`; `vowel_sounds@main c1590356`; `world_explorer@main eb8e6525`; `zero_hero@main 5149a22d`; `zombie-defense@main 7ab9ed0e` (not in the 9-game list — §7 candidate).
