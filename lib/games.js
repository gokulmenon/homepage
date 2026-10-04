/**
 * games.js — the Games Arcade registry used by pages.
 *
 * Resolves each game's deployment URL from its env var (see lib/games-data.js).
 * A game with no URL yet is "coming soon": the hub renders it as a disabled
 * card and next.config.js skips its rewrite rule.
 */
import GAMES_DATA from './games-data.js';

export const getDestinationUrl = (game) =>
  process.env[game.envName] || game.defaultUrl || '';

export const isGameLive = (game) => Boolean(getDestinationUrl(game));

export const GAMES = GAMES_DATA.map((game) => {
  const destinationUrl = getDestinationUrl(game);
  return { ...game, destinationUrl, live: Boolean(destinationUrl) };
});

export const getGameBySlug = (slug) => GAMES.find((g) => g.slug === slug);
