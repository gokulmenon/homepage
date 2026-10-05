/**
 * games-registry.js — the Games Arcade data layer.
 *
 * The single interface the hub (and later Supabase) speaks:
 *   listGames()                        — all games, URL-resolved, derived fields attached
 *   getGameBySlug(slug)                — one game or undefined
 *   getCategories()                    — sorted category list (for filters)
 *   searchGames(query, { sort, category, maxAge })
 *                                      — filtered + sorted results
 *
 * Today the records come from data/games.json (static, checked in). When the
 * Supabase `games` table lands, this module gains a Supabase backend behind an
 * env check and the hub page doesn't change: same functions, same shapes.
 *
 * Record shape (mirrors the planned Supabase schema):
 *   id, slug, title, description, category, tags[],
 *   minAge, maxAge (null = no upper bound),
 *   thumbnail, envName, defaultUrl, extraAssetPrefixes[],
 *   featured, sortOrder
 * Derived per record:
 *   destinationUrl — env var → defaultUrl → '' ('' = "Coming soon")
 *   live           — Boolean(destinationUrl)
 *   ageGroup       — "4+" / "4–8" display string
 */
import GAMES_DATA from './games-data.js';

export const getDestinationUrl = (game) =>
  process.env[game.envName] || game.defaultUrl || '';

export const isGameLive = (game) => Boolean(getDestinationUrl(game));

const withDerived = (game) => {
  const destinationUrl = getDestinationUrl(game);
  return {
    ...game,
    destinationUrl,
    live: Boolean(destinationUrl),
    ageGroup:
      game.maxAge == null ? `${game.minAge}+` : `${game.minAge}–${game.maxAge}`,
  };
};

const ALL_GAMES = GAMES_DATA.map(withDerived);

/** All games, in featured/sortOrder order. */
export const listGames = () => ALL_GAMES.slice();

/** Back-compat alias (was exported from lib/games.js). */
export const GAMES = listGames();

export const getGameBySlug = (slug) => ALL_GAMES.find((g) => g.slug === slug);

export const getCategories = () =>
  [...new Set(ALL_GAMES.map((g) => g.category))].sort();

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
  { sort = 'featured', category = 'all', maxAge = null } = {}
) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = ALL_GAMES.filter((game) => {
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
