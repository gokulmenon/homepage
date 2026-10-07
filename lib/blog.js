// lib/blog.js — blog data layer.
//
// Production: Supabase tables `blog_posts` / `blog_comments` (service-role key,
// server-side only — RLS exposes nothing publicly).
// Local builds: when NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are
// absent, the checked-in `data/blog-export.json` fixture is used, so
// `npm run build:local` stays hermetic. Same fallback pattern as the old
// Sanity mock, but with real exported content.
import { createClient } from '@supabase/supabase-js'
import fixture from '../data/blog-export.json'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const USE_DB = Boolean(SUPABASE_URL && SERVICE_KEY)

let _client = null
function db() {
  if (!_client) _client = createClient(SUPABASE_URL, SERVICE_KEY)
  return _client
}

// DB row (+ approved comments) -> page props. Field names intentionally match
// the old Sanity shape so page components barely change.
function mapPost(row, comments = []) {
  return {
    _id: row.id,
    title: row.title,
    slug: row.slug,
    date: row.published_at,
    excerpt: row.excerpt,
    coverImage: row.cover_image_url,
    author: { name: row.author_name, picture: row.author_picture_url },
    // body_markdown is only selected by the detail query (getPostAndMorePosts);
    // list queries omit it, so don't serialize an `undefined` value.
    ...(row.body_markdown !== undefined
      ? { body_markdown: row.body_markdown }
      : {}),
    comments: comments.map((c) => ({
      _id: c.id,
      name: c.name,
      email: c.email,
      comment: c.comment,
      _createdAt: c.created_at,
    })),
  }
}

async function dbCommentsFor(postId) {
  const { data, error } = await db()
    .from('blog_comments')
    .select('id,name,email,comment,created_at')
    .eq('post_id', postId)
    .eq('approved', true)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

// --- fixture fallback ---------------------------------------------------------
const fixtureCommentsFor = (sanityId) =>
  fixture.comments
    .filter((c) => c.postId === sanityId && c.approved)
    .map((c) => ({
      id: c._id,
      name: c.name,
      email: c.email,
      comment: c.comment,
      created_at: c._createdAt,
    }))

function fixtureMapPost(p) {
  return mapPost(
    {
      id: p._id,
      title: p.title,
      slug: p.slug,
      published_at: p.publishedAt,
      excerpt: p.excerpt,
      cover_image_url: p.coverImage,
      author_name: p.author?.name,
      author_picture_url: p.author?.picture,
      body_markdown: p.body_markdown,
    },
    fixtureCommentsFor(p._id)
  )
}

const byDateDesc = (a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)

// --- public API ----------------------------------------------------------------
// Shared reading-time helper: 200 words/minute, minimum 1 minute.
export function readingTimeFor(markdown) {
  const words = (markdown || '').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export async function getAllPostsWithSlug() {
  if (USE_DB) {
    const { data, error } = await db()
      .from('blog_posts')
      .select('slug')
      .eq('published', true)
    if (error) throw error
    return data
  }
  return fixture.posts.map((p) => ({ slug: p.slug }))
}

export async function getAllPostsForHome() {
  if (USE_DB) {
    const { data, error } = await db()
      .from('blog_posts')
      .select(
        'id,title,slug,published_at,excerpt,cover_image_url,author_name,author_picture_url'
      )
      .eq('published', true)
      .order('published_at', { ascending: false })
    if (error) throw error
    // Reading time is computed here at build time from body word counts.
    // Bodies are fetched in a separate query and never serialized into the
    // page props, keeping the listing payload light.
    let readingTimes = {}
    try {
      const { data: bodies, error: bodiesError } = await db()
        .from('blog_posts')
        .select('slug,body_markdown')
        .eq('published', true)
      if (bodiesError) throw bodiesError
      for (const b of bodies || []) {
        readingTimes[b.slug] = readingTimeFor(b.body_markdown)
      }
    } catch {
      readingTimes = {}
    }
    return data.map((r) => ({
      ...mapPost(r),
      readingTime: readingTimes[r.slug] ?? null,
    }))
  }
  return [...fixture.posts]
    .sort(byDateDesc)
    .map((p) => ({ ...fixtureMapPost(p), readingTime: readingTimeFor(p.body_markdown) }))
}

export async function getPostAndMorePosts(slug) {
  if (USE_DB) {
    const { data: row, error } = await db()
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    if (error && error.code !== 'PGRST116') throw error
    if (!row) return { post: null, morePosts: [] }
    const { data: others } = await db()
      .from('blog_posts')
      .select(
        'id,title,slug,published_at,excerpt,cover_image_url,author_name,author_picture_url'
      )
      .neq('slug', slug)
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(2)
    return {
      post: mapPost(row, await dbCommentsFor(row.id)),
      morePosts: (others || []).map((r) => mapPost(r)),
    }
  }
  const post = fixture.posts.find((p) => p.slug === slug)
  const more = fixture.posts
    .filter((p) => p.slug !== slug)
    .sort(byDateDesc)
    .slice(0, 2)
  return {
    post: post ? fixtureMapPost(post) : null,
    morePosts: more.map(fixtureMapPost),
  }
}
