import PageShell from '../components/PageShell'

export default function Custom404() {
  return (
    <PageShell active="" articleId="notfound" title="Page not found">
      <h2 className="major">404</h2>
      <p>This page doesn&apos;t exist — it may have moved, or the link is broken.</p>
      <ul className="actions">
        <li><a href="/" className="button">Home</a></li>
        <li><a href="/blog" className="button">Blog</a></li>
      </ul>
    </PageShell>
  )
}
