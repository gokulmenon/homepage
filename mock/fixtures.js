/**
 * mock/fixtures.js — fixture data for offline local builds.
 *
 * Activated via MOCK_EXTERNAL_APIS=1 (`npm run build:local`). YouTube fixtures
 * mirror the shapes the real API returns (see lib/youtube.js) so pages build
 * and render exactly as in production. Blog pages use data/blog-export.json
 * (real exported content) when Supabase env vars are absent.
 */

const LOCAL_IMG = '/static/images/coming_soon.jpg';

const mockVideo = (n, videoId, title) => ({
  snippet: {
    title,
    description: `Local mock description for "${title}".`,
    publishedAt: `2026-09-0${n}T12:00:00Z`,
    thumbnails: {
      medium: { url: LOCAL_IMG, width: 320, height: 180 },
    },
    resourceId: { videoId },
  },
});

export const mockYoutubeItems = [
  mockVideo(1, 'mock-video-1', 'Mock Video One'),
  mockVideo(2, 'mock-video-2', 'Mock Video Two'),
  mockVideo(3, 'mock-video-3', 'Mock Video Three'),
];
