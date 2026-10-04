/**
 * games-data.js — static metadata for the Games Arcade hub.
 *
 * Plain CommonJS so it can be required from next.config.js (which is CJS)
 * as well as imported via lib/games.js (ESM) for pages.
 *
 * `envName` is the Vercel env var holding the game's production deployment
 * URL (e.g. https://memory-game-xyz.vercel.app). Until a game is deployed,
 * the var is unset and the game shows as "Coming soon" in the hub.
 * Rewrites are generated from this same list (next.config.js), so adding a
 * game = deploy it + set its env var + redeploy the homepage.
 *
 * Adding a game later: append an entry, keep `slug` URL-safe, namespace any
 * localStorage keys the game uses as `<slug>_…` (shared origin!).
 */
module.exports = [
  {
    id: 'memory-game',
    slug: 'memory-game',
    title: 'Memory Game',
    description: 'Classic card-match memory game.',
    category: 'Memory',
    ageGroup: '4+',
    envName: 'NEXT_PUBLIC_MEMORY_GAME_URL',
  },
  {
    id: 'snakes-ladders',
    slug: 'snakes-ladders',
    title: 'Snakes & Ladders',
    description: 'Roll the dice, climb the ladders, dodge the snakes.',
    category: 'Board',
    ageGroup: '4+',
    envName: 'NEXT_PUBLIC_SNAKES_LADDERS_URL',
  },
  {
    id: 'trivia',
    slug: 'trivia',
    title: 'Trivia',
    description: 'Math, reading and geography trivia for kids.',
    category: 'Quiz',
    ageGroup: '5+',
    envName: 'NEXT_PUBLIC_TRIVIA_URL',
  },
  {
    id: 'number-hero',
    slug: 'number-hero',
    title: 'Number Hero',
    description: 'Learn numbers 1–100 in English, Hindi and Spanish, with spoken audio.',
    category: 'Math',
    ageGroup: '4+',
    envName: 'NEXT_PUBLIC_NUMBER_HERO_URL',
  },
  {
    id: 'zero-hero',
    slug: 'zero-hero',
    title: 'Zero Hero',
    description: 'Big numbers, fun facts and spoken number names.',
    category: 'Math',
    ageGroup: '6+',
    envName: 'NEXT_PUBLIC_ZERO_HERO_URL',
  },
  {
    id: 'vowel-sounds',
    slug: 'vowel-sounds',
    title: 'Vowel Sounds',
    description: 'Practice vowel sounds with the chart and audio.',
    category: 'Language',
    ageGroup: '4+',
    envName: 'NEXT_PUBLIC_VOWEL_SOUNDS_URL',
  },
  {
    id: 'vocab-venture',
    slug: 'vocab-venture',
    title: 'Vocab Venture',
    description: 'Word adventures with AI-generated lists and spoken audio.',
    category: 'Language',
    ageGroup: '7+',
    envName: 'NEXT_PUBLIC_VOCAB_VENTURE_URL',
  },
  {
    id: 'monopoly',
    slug: 'monopoly',
    title: 'Monopoly',
    description: 'Monopoly deal-style card game.',
    category: 'Board',
    ageGroup: '8+',
    envName: 'NEXT_PUBLIC_MONOPOLY_URL',
  },
  {
    id: 'world-explorer',
    slug: 'world-explorer',
    title: 'World Explorer',
    description: 'Explore world geography, flags and landmarks in an interactive quest.',
    category: 'Geography',
    ageGroup: '7+',
    envName: 'NEXT_PUBLIC_WORLD_EXPLORER_URL',
  },
];
