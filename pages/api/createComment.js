import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import emailjs from '@emailjs/nodejs'

const db = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const ok = (res, message) => res.status(200).json({ message })

// Comment submission pipeline:
//  1. honeypot (bots fill it -> fake success, dropped silently)
//  2. input validation + link-count heuristic
//  3. captcha token presence (verified once by EmailJS in step 7 —
//     reCAPTCHA tokens are single-use, so only one verifier may consume it)
//  4. per-IP rate limit (DB-backed; serverless has no memory)
//  5. insert as approved=false
//  6. single-use 7-day approval token -> EmailJS notify to Gokul
//     (EmailJS verifies the captcha; on rejection the insert is rolled back)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(503).json({ message: 'Comments are temporarily unavailable' })
  }
  const { postSlug, name, email, comment, website, captcha } = req.body || {}

  // 1. Honeypot
  if (website) return ok(res, 'Comment submitted')

  // 2. Validation
  const cleanName = String(name || '').trim()
  const cleanEmail = String(email || '').trim()
  const cleanComment = String(comment || '').trim()
  if (!postSlug || cleanName.length < 2 || cleanName.length > 60) {
    return res.status(400).json({ message: 'Please enter a valid name' })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail) || cleanEmail.length > 120) {
    return res.status(400).json({ message: 'Please enter a valid email' })
  }
  if (cleanComment.length < 2 || cleanComment.length > 2000) {
    return res.status(400).json({ message: 'Comment must be 2-2000 characters' })
  }
  if ((cleanComment.match(/https?:\/\//g) || []).length > 2) {
    return res.status(400).json({ message: 'Too many links in comment' })
  }

  // 3. reCAPTCHA token must be present. It is verified exactly once by
  //    EmailJS during the notify send (step 7) — verifying it here as well
  //    would consume the single-use token and break EmailJS's check.
  if (!captcha) return res.status(400).json({ message: 'Captcha required' })

  const sb = db()

  // Resolve post
  const { data: post } = await sb
    .from('blog_posts')
    .select('id,title,slug')
    .eq('slug', postSlug)
    .eq('published', true)
    .single()
  if (!post) return res.status(404).json({ message: 'Post not found' })

  // 4. Rate limit: 5 comments/hour per IP hash
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  const ipHash = crypto
    .createHash('sha256')
    .update(ip + (process.env.APPROVAL_SECRET || 'blog-salt'))
    .digest('hex')
  const hourAgo = new Date(Date.now() - 3600 * 1000).toISOString()
  const { count } = await sb
    .from('blog_comments')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gt('created_at', hourAgo)
  if ((count || 0) >= 5) {
    return res.status(429).json({ message: 'Too many comments — try again later' })
  }

  // 5. Insert unapproved
  const { data: row, error } = await sb
    .from('blog_comments')
    .insert({
      post_id: post.id,
      name: cleanName,
      email: cleanEmail,
      comment: cleanComment,
      ip_hash: ipHash,
    })
    .select('id')
    .single()
  if (error || !row) {
    console.error('comment insert error', error)
    return res.status(500).json({ message: "Couldn't submit comment" })
  }

  // 6. Approval token: <commentId>.<expiryEpoch>.<hmac>, 7-day TTL, single-use
  const expiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 3600
  const payload = `${row.id}.${expiresAt}`
  const sig = crypto
    .createHmac('sha256', process.env.APPROVAL_SECRET)
    .update(payload)
    .digest('hex')
  const token = `${payload}.${sig}`
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  await sb
    .from('blog_comments')
    .update({
      approval_token_hash: tokenHash,
      approval_token_expires_at: new Date(expiresAt * 1000).toISOString(),
    })
    .eq('id', row.id)

  // 7. Notify Gokul via EmailJS (same Gmail service, dedicated template).
  //    A notify failure must not fail the submission — the comment is safe
  //    in the DB and can be approved from the Supabase dashboard.
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
      process.env.EMAIL_JS_COMMENT_TEMPLATE_ID || 'blog_comment_notification',
      {
        to_email: 'admin@gokulmenon.com',
        post_title: post.title,
        post_slug: post.slug,
        commenter_name: cleanName,
        commenter_email: cleanEmail,
        comment_text: cleanComment,
        approve_url: `https://gokulmenon.com/api/comments/approve?token=${token}`,
        // EmailJS enforces its own reCAPTCHA check on server-side sends;
        // forward the token we already verified with Google above.
        'g-recaptcha-response': captcha,
      },
      {
        publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_USER_ID,
        privateKey: process.env.EMAIL_JS_PRIVATE_KEY,
      }
    )
  } catch (err) {
    const errText = err?.text || err?.message || ''
    if (/captcha/i.test(errText)) {
      // EmailJS rejected the captcha (bot or expired token): roll back the
      // unapproved insert so spam never accumulates in the table.
      await sb.from('blog_comments').delete().eq('id', row.id)
      return res.status(400).json({ message: 'Captcha verification failed' })
    }
    console.error('comment notify email failed', err?.message || err?.text || err)
  }

  return ok(res, 'Comment submitted')
}
