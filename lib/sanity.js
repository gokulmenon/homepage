import {
  groq,
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from 'next-sanity'
import { mockPosts } from '../mock/fixtures'

// Local-build mock switch. Set MOCK_EXTERNAL_APIS=1 (via `npm run build:local`)
// to build with fixture data instead of the live Sanity API — useful where the
// API is unreachable (sandboxed CI, offline dev). NEVER set this in production
// (Vercel/GAE); the env var is the only switch, defaulting to the real client.
const USE_MOCK = process.env.MOCK_EXTERNAL_APIS === '1'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
}

// --- Mock implementations (local only) --------------------------------------
// Answers the exact GROQ shapes lib/api.js issues (see mock/fixtures.js).
const mockFetch = async (query = '', params) => {
  // getAllPostsWithSlug(): `*[_type == "post"]{ 'slug': slug.current }`
  if (query.includes(`{ 'slug': slug.current }`)) {
    return mockPosts.map((p) => ({ slug: p.slug }))
  }
  // getPreviewPostBySlug() / getPostAndMorePosts(): single post by slug
  if (params?.slug && query.includes('slug.current == $slug')) {
    const post = mockPosts.find((p) => p.slug === params.slug)
    return post ? [{ ...post, comments: [] }] : []
  }
  // getPostAndMorePosts(): more posts (already sliced to 2 by the query)
  if (params?.slug && query.includes('slug.current != $slug')) {
    return mockPosts.filter((p) => p.slug !== params.slug).slice(0, 2)
  }
  // getAllPostsForHome()
  return [...mockPosts]
}

const mockClient = {
  fetch: mockFetch,
  create: async (doc) => ({ ...doc, _id: `mock-${Date.now()}` }),
}

// Chainable like the real builder; serves a local asset so pages render
// fully offline.
const mockImageBuilder = () => {
  const chain = {
    width: () => chain,
    height: () => chain,
    url: () => '/static/images/coming_soon.jpg',
  }
  return chain
}

// Preview hook mock: just pass the initial data through.
const mockUsePreviewSubscription = (query, { initialData } = {}) => ({
  data: initialData,
})
// --- End mock ----------------------------------------------------------------

const realImageBuilder = (source) => createImageUrlBuilder(config).image(source)

export const imageBuilder = USE_MOCK ? mockImageBuilder : realImageBuilder
export const usePreviewSubscription = USE_MOCK
  ? mockUsePreviewSubscription
  : createPreviewSubscriptionHook(config)
export const client = USE_MOCK ? mockClient : createClient(config)
export const previewClient = USE_MOCK
  ? mockClient
  : createClient({
      ...config,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })

export const getClient = (usePreview) => (usePreview ? previewClient : client)
export default client
