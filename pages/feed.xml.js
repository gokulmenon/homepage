// RSS 2.0 feed for the blog — the <head> advertises /feed.xml, so this
// route actually serves it. Generated live from the posts table.
import { getAllPostsForHome } from '../lib/blog'

const SITE = 'https://gokulmenon.com'

function escapeXml(s) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function getServerSideProps({ res }) {
  const posts = await getAllPostsForHome()
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE}/posts/${post.slug}</link>
      <guid>${SITE}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`
    )
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Gokul Menon Blog</title>
    <link>${SITE}/blog</link>
    <description>Posts on software, AI, and tinkering by Gokul Menon.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`
  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()
  return { props: {} }
}

export default function Feed() {
  return null
}
