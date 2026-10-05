/**
 * games-data.js — static metadata for the Games Arcade hub.
 *
 * Plain CommonJS so it can be required from next.config.js (which is CJS)
 * as well as imported via lib/games-registry.js (ESM) for pages.
 *
 * Single source of truth lives in data/games.json (same shape the future
 * Supabase `games` table will use). Keep `slug` URL-safe, namespace any
 * localStorage keys the game uses as `<slug>_…` (shared origin!).
 *
 * `envName` is the Vercel env var holding the game's production deployment
 * URL, `defaultUrl` is the checked-in fallback. Resolution order is
 * env var → defaultUrl → '' ('' renders the game as "Coming soon").
 * Rewrites are generated from this same list (next.config.js), so wiring a
 * game = set its URL here (or via env) + redeploy the homepage.
 */
module.exports = require('../data/games.json');
