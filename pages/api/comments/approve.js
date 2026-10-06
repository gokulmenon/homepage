import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const db = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// Token: <commentId>.<expiryEpoch>.<hmac(commentId.expiry, APPROVAL_SECRET)>
// Bearer auth, single-use, 7-day TTL. Delivered only to Gokul's inbox.
// GET renders a confirmation page (never mutates — email scanners prefetch
// links); only POST with a valid unused token changes anything.
function parseToken(token) {
  const parts = String(token || '').split('.')
  if (parts.length !== 3) return null
  const [commentId, expiresAt, sig] = parts
  if (!commentId || !/^\d+$/.test(expiresAt)) return null
  const expected = crypto
    .createHmac('sha256', process.env.APPROVAL_SECRET)
    .update(`${commentId}.${expiresAt}`)
    .digest('hex')
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return null
  }
  if (Date.now() / 1000 > Number(expiresAt)) return null
  return { commentId }
}

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const page = (title, inner) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title></head>
<body style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:48px auto;padding:0 20px;color:#1a1a1a;line-height:1.5">
<h2>${esc(title)}</h2>${inner}</body></html>`

async function loadComment(token) {
  const parsed = parseToken(token)
  if (!parsed) return { error: 'This approval link is invalid or has expired.' }
  const sb = db()
  const tokenHash = crypto.createHash('sha256').update(String(token)).digest('hex')
  const { data: comment } = await sb
    .from('blog_comments')
    .select('id,post_id,name,email,comment,approved,approval_token_hash,created_at,blog_posts(title,slug)')
    .eq('id', parsed.commentId)
    .single()
  if (!comment || comment.approval_token_hash !== tokenHash) {
    return { error: 'This approval link has already been used or is invalid.' }
  }
  return { comment, sb }
}

export default async function handler(req, res) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).send(page('Unavailable', '<p>Comment moderation is temporarily unavailable.</p>'))
  }
  if (req.method === 'GET') {
    const { comment, error } = await loadComment(req.query.token)
    if (error) return res.status(400).send(page('Link invalid', `<p>${esc(error)}</p>`))
    const post = comment.blog_posts || {}
    return res.status(200).send(
      page(
        'Moderate comment',
        `<p><strong>Post:</strong> ${esc(post.title)} (<code>${esc(post.slug)}</code>)</p>
         <p><strong>From:</strong> ${esc(comment.name)} &lt;${esc(comment.email)}&gt;</p>
         <blockquote style="border-left:3px solid #ccc;padding-left:12px;color:#333">${esc(comment.comment).replace(/\n/g, '<br>')}</blockquote>
         <form method="POST" style="display:inline;margin-right:12px">
           <input type="hidden" name="token" value="${esc(req.query.token)}">
           <input type="hidden" name="action" value="approve">
           <button type="submit" style="background:#16a34a;color:#fff;border:0;border-radius:6px;padding:10px 24px;font-size:16px;cursor:pointer">Approve</button>
         </form>
         <form method="POST" style="display:inline">
           <input type="hidden" name="token" value="${esc(req.query.token)}">
           <input type="hidden" name="action" value="reject">
           <button type="submit" style="background:#dc2626;color:#fff;border:0;border-radius:6px;padding:10px 24px;font-size:16px;cursor:pointer">Reject &amp; delete</button>
         </form>
         <p style="color:#666;font-size:14px">This link is single-use and expires 7 days after the comment was posted.</p>`
      )
    )
  }

  if (req.method === 'POST') {
    const { token, action } = req.body || {}
    const { comment, sb, error } = await loadComment(token)
    if (error) return res.status(400).send(page('Link invalid', `<p>${esc(error)}</p>`))
    // Consume the token first so a double-submit can't act twice.
    await sb
      .from('blog_comments')
      .update({ approval_token_hash: null, approval_token_expires_at: null })
      .eq('id', comment.id)
    if (action === 'approve') {
      await sb.from('blog_comments').update({ approved: true }).eq('id', comment.id)
      const slug = comment.blog_posts?.slug
      // On-demand ISR so the newly approved comment appears immediately
      // instead of waiting out the revalidate window. A revalidation
      // failure must not undo the approval.
      if (slug) {
        try {
          await res.revalidate(`/posts/${slug}`)
        } catch (err) {
          console.error('revalidate failed', err?.message || err)
        }
      }
      return res.status(200).send(
        page(
          'Comment approved',
          `<p>The comment is now approved and visible on the post.</p>` +
            (slug ? `<p><a href="/posts/${esc(slug)}">View post</a></p>` : '')
        )
      )
    }
    if (action === 'reject') {
      await sb.from('blog_comments').delete().eq('id', comment.id)
      return res.status(200).send(page('Comment rejected', '<p>The comment has been deleted.</p>'))
    }
    return res.status(400).send(page('Bad request', '<p>Unknown action.</p>'))
  }

  return res.status(405).send('Method not allowed')
}
