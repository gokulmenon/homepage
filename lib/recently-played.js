/**
 * recently-played.js — client-side "recently played" tracking for the
 * Games Arcade hub. Pure localStorage, no backend. Shared origin means
 * slugs are namespaced by the hub itself (no per-game keys needed).
 */

const STORAGE_KEY = 'games-arcade:recently-played';
const MAX_STORED = 12;

export function getRecentlyPlayedSlugs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

export function recordPlay(slug) {
  try {
    const list = getRecentlyPlayedSlugs().filter((s) => s !== slug);
    list.unshift(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_STORED)));
  } catch {
    // Private browsing etc. — the hub works fine without recents.
  }
  return getRecentlyPlayedSlugs();
}
