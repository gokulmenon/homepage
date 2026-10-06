// sitemap.xml — main pages + every published post, generated live so new
// posts are picked up without a rebuild.
import { getAllPostsWithSlug } from '../lib/blog'

const SITE = 'https://gokulmenon.com'
const PAGES = ['', '/intro', '/blog', '/photos', '/videos', '/podcasts', '/contact', '/games']

export async function getServerSideProps({ res }) {
  const posts = await getAllPostsWithSlug()
  const urls = [
    ...PAGES.map((p) => `  <url><loc>${SITE}${p || '/'}</loc></url>`),
    ...(posts || [])
      .filter((p) => p.slug)
      .map((p) => `  <url><loc>${SITE}/posts/${p.slug}</loc></url>`),
  ].join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()
  return { props: {} }
}

export default function Sitemap() {
  return null
}
