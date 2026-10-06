/**
 * games-registry.js — the Games Arcade data layer.
 *
 * The single interface the hub speaks:
 *   listGames()                        — static JSON records, URL-resolved
 *   loadGames()                        — Supabase `games` table when configured,
 *                                        static JSON fallback otherwise (async)
 *   gameFromRow(row)                   — map a Supabase row onto a record
 *   getGameBySlug(slug)                — one game or undefined (static set)
 *   getCategories(games?)              — sorted category list (for filters)
 *   searchGames(query, { sort, category, maxAge }, games?)
 *                                      — filtered + sorted results
 *
 * Supabase is active when NEXT_PUBLIC_SUPABASE_URL and
 * NEXT_PUBLIC_SUPABASE_ANON_KEY are set. Every Supabase failure (missing env,
 * network error, table not migrated yet) falls back to data/games.json, so a
 * fresh deploy never renders an empty arcade.
 *
 * Record shape (mirrors the Supabase schema):
 *   id, slug, title, description, category, tags[],
 *   minAge, maxAge (null = no upper bound),
 *   thumbnail, envName, defaultUrl, href, extraAssetPrefixes[],
 *   featured, sortOrder
 * Derived per record:
 *   destinationUrl — env var → defaultUrl → '' ('' = "Coming soon")
 *   live           — Boolean(href || destinationUrl)
 *   ageGroup       — "4+" / "4–8" display string
 */
import GAMES_DATA from './games-data.js';
import { createClient } from '@supabase/supabase-js';

export const getDestinationUrl = (game) =>
  process.env[game.envName] || game.defaultUrl || '';

export const isGameLive = (game) => Boolean(getDestinationUrl(game));

const withDerived = (game) => {
  const destinationUrl = getDestinationUrl(game);
  const derived = {
    ...game,
    destinationUrl,
    // Variants deep-link via `href` (verified live at registration time);
    // standalone games are live when they resolve a deployment URL.
    live: Boolean(game.href || destinationUrl),
    ageGroup:
      game.maxAge == null ? `${game.minAge}+` : `${game.minAge}–${game.maxAge}`,
  };
  // Backstop: Next.js cannot serialize `undefined` from getStaticProps —
  // drop such keys so a future nullable column can't break the build.
  for (const k of Object.keys(derived)) {
    if (derived[k] === undefined) delete derived[k];
  }
  return derived;
};

const ALL_GAMES = GAMES_DATA.map(withDerived);

/** All games, in featured/sortOrder order. */
export const listGames = () => ALL_GAMES.slice();

/** Back-compat alias (was exported from lib/games.js). */
export const GAMES = listGames();

export const getGameBySlug = (slug) => ALL_GAMES.find((g) => g.slug === slug);

export const getCategories = (games = ALL_GAMES) =>
  [...new Set(games.map((g) => g.category))].sort();

const SORTERS = {
  featured: (a, b) =>
    Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder,
  az: (a, b) => a.title.localeCompare(b.title),
  age: (a, b) => a.minAge - b.minAge || a.title.localeCompare(b.title),
};

/**
 * Filter + sort the catalog. Every query token must appear somewhere in the
 * game's title, description, category, age display, or tags. `maxAge` keeps
 * games whose minimum age is at or below the given age.
 */
export function searchGames(
  query = '',
  { sort = 'featured', category = 'all', maxAge = null } = {},
  games = ALL_GAMES
) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = games.filter((game) => {
    if (category !== 'all' && game.category !== category) return false;
    if (maxAge != null && game.minAge > maxAge) return false;
    if (!tokens.length) return true;
    const haystack = [
      game.title,
      game.description,
      game.category,
      game.ageGroup,
      ...(game.tags || []),
    ]
      .join(' ')
      .toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });
  const sorter = SORTERS[sort] || SORTERS.featured;
  return results.sort(sorter);
}

// ---------------------------------------------------------------------------
// Supabase backend
// ---------------------------------------------------------------------------

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

/** Map a `games` table row onto the registry record shape. */
export const gameFromRow = (row) => {
  const game = {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    tags: row.tags || [],
    minAge: row.min_age,
    maxAge: row.max_age,
    thumbnail: row.thumbnail_url,
    envName: row.env_override,
    defaultUrl: row.deployment_url,
    extraAssetPrefixes: row.extra_asset_prefixes || [],
    featured: row.featured,
    sortOrder: row.sort_order,
  };
  // Omit when the DB has NULL: the key must not exist as `undefined`.
  if (row.href) game.href = row.href;
  return withDerived(game);
};

/**
 * Load the catalog, preferring Supabase. Any failure — env vars absent,
 * network error, table not migrated yet — falls back to the static JSON, so
 * callers always get a usable array. Safe at build time (getStaticProps).
 */
export async function loadGames() {
  if (!supabase) return listGames();
  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .neq('status', 'deprecated')
      .order('featured', { ascending: false })
      .order('sort_order', { ascending: true });
    if (error || !data || !data.length) return listGames();
    return data.map(gameFromRow);
  } catch {
    return listGames();
  }
}
