const GAMES_DATA = require('./lib/games-data');

// Strip trailing slashes so `${url}/:path*` never produces `//`.
const stripTrailingSlash = (url) => url.replace(/\/+$/, '');

// Resolve a game's deployment base: env var first, checked-in default next.
const gameBaseUrl = (game) =>
  stripTrailingSlash(process.env[game.envName] || game.defaultUrl || '');

module.exports = {
    distDir: 'build',
    images: {
      domains: ['yt3.ggpht.com','i.ytimg.com','i.ibb.co'],
    },
    // Games Arcade: reverse-proxy each deployed game under /games/<slug>.
    // Games with no URL (no env var, no defaultUrl) get no rule and render
    // as "Coming soon" in the hub (see lib/games.js). Rewrites are evaluated
    // at build/start time.
    // `extraAssetPrefixes` covers games that emit absolute asset URLs
    // (e.g. Expo's /_expo/*): those prefixes are proxied to the game's own
    // deployment so the game works under the subpath untouched.
    async rewrites() {
      const rules = [];
      for (const game of GAMES_DATA) {
        const base = gameBaseUrl(game);
        if (!base) continue;
        rules.push({
          source: `/games/${game.slug}/:path*`,
          destination: `${base}/:path*`,
        });
        for (const prefix of game.extraAssetPrefixes || []) {
          if (!prefix) continue; // guard: an empty prefix would emit a `/:path*` rule and hijack the whole site
          rules.push({
            source: `${prefix}/:path*`,
            destination: `${base}${prefix}/:path*`,
          });
        }
      }
      return rules;
    },
  }
