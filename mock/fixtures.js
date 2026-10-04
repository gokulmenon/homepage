/**
 * mock/fixtures.js — fixture data for offline local builds.
 *
 * Activated via MOCK_EXTERNAL_APIS=1 (`npm run build:local`). The fixtures
 * mirror the shapes the real Sanity/YouTube APIs return (see lib/api.js and
 * lib/youtube.js) so pages build and render exactly as in production.
 * Images point at a real local asset so pages render fully offline.
 */

const LOCAL_IMG = '/static/images/coming_soon.jpg';

const bodyBlock = (text, key) => ({
  _type: 'block',
  _key: key,
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: `${key}-s1`, text, marks: [] }],
});

const mockPost = (n, slug, title) => ({
  _id: `mock-post-${n}`,
  name: 'Gokul Menon',
  title,
  date: `2026-0${n}-15`,
  excerpt: `Local mock excerpt for "${title}". Replace with real Sanity content.`,
  slug,
  coverImage: {
    _type: 'image',
    asset: { _type: 'reference', _ref: `image-mock${n}-1600x900-jpg` },
  },
  author: {
    name: 'Gokul Menon',
    picture: LOCAL_IMG,
  },
  body: [
    bodyBlock(
      `This is mock body content for "${title}". It exists so local builds can prerender blog pages without reaching the Sanity API.`,
      `b${n}a`
    ),
    bodyBlock('Second paragraph of the mock post.', `b${n}b`),
  ],
  comments: [],
});

export const mockPosts = [
  mockPost(1, 'mock-post-one', 'Mock Post One'),
  mockPost(2, 'mock-post-two', 'Mock Post Two'),
  mockPost(3, 'mock-post-three', 'Mock Post Three'),
];

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
