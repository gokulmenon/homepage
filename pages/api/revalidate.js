// On-demand ISR revalidation for the blog publisher app (and other trusted
// local tooling). Not linked from anywhere; requires the shared secret.
//
//   POST /api/revalidate?secret=<REVALIDATE_SECRET>&slug=<post-slug>
//
// Revalidates /blog and /posts/[slug] (slug optional). The Blog Publisher
// calls this after saving so new/edited posts appear within seconds instead
// of waiting out the hourly ISR window.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.query.secret !== secret) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  try {
    await res.revalidate('/blog')
    const slug = typeof req.query.slug === 'string' ? req.query.slug.trim() : ''
    if (slug) await res.revalidate(`/posts/${slug}`)
    return res.json({ revalidated: true })
  } catch (err) {
    console.error('revalidate failed', err?.message || err)
    return res.status(500).json({ message: 'Revalidation failed' })
  }
}
