const GAMES_DATA = require('./lib/games-data');

// Strip trailing slashes so `${url}/:path*` never produces `//`.
const stripTrailingSlash = (url) => url.replace(/\/+$/, '');

module.exports = {
    distDir: 'build',
    images: {
      domains: ['yt3.ggpht.com','i.ytimg.com','i.ibb.co'],
    },
    // Games Arcade: reverse-proxy each deployed game under /games/<slug>.
    // Only games with their env URL set get a rule; the rest render as
    // "Coming soon" in the hub (see lib/games.js). Rewrites are evaluated
    // at build/start time from the same env vars.
    async rewrites() {
      return GAMES_DATA
        .filter((game) => process.env[game.envName])
        .map((game) => ({
          source: `/games/${game.slug}/:path*`,
          destination: `${stripTrailingSlash(process.env[game.envName])}/:path*`,
        }));
    },
  }
