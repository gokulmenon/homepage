/**
 * games.js — kept as a thin compat shim.
 * New code should import from lib/games-registry.js instead.
 */
export {
  GAMES,
  getGameBySlug,
  getDestinationUrl,
  isGameLive,
} from './games-registry.js';
