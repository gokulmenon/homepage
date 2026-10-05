# Blog migration plan: Sanity.io → Supabase

**Status:** Approved by Gokul on 2026-10-05. Token TTL: 7 days (covers long weekends).

## Why

Sanity is overhead for ~1 post/year. Supabase is the DB Gokul already uses (home-monitoring), always on, with easy export (SQL/CSV). Post bodies stored as Markdown text so a future move to repo-only markdown files is trivial.

## Current state (verified 2026-10-05)

- 78 posts in Sanity (project `we7hi9de`, dataset `production`), archive back to 2008. Slugs must be preserved (no URL breaks).
- 7 comments total: 5 approved, 2 pending (`approved != true`).
- Comments: Sanity `comment` type, only `approved == true` shown; approval in Sanity Studio.
- Comment form (`components/blog/form.js`) has **no spam protection**.
- Preview mode (`pages/api/preview.js`, `exit-preview.js`) is Sanity-based.

## Data model (one Supabase project, e.g. `homepage-blog`)

```sql
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  cover_image_url text,
  author_name text,
  author_picture_url text,
  published_at timestamptz not null,
  body_markdown text not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references blog_posts(id) on delete cascade,
  name text not null,
  email text not null,
  comment text not null,
  approved boolean not null default false,
  ip_hash text,
  approval_token_hash text,
  approval_token_expires_at timestamptz,
  created_at timestamptz not null default now()
);
create index on blog_comments (post_id) where (approved = true);
```

RLS: enabled, **no public policies** — all access via the service-role key from API routes / `getStaticProps`. Anon key is never used.

## Migration (one-time export script)

1. Pull all posts + comments from the Sanity API.
2. Convert portable text → Markdown; download images → `public/images/blog/` (repo), rewrite URLs.
3. Insert into `blog_posts` (original `published_at`, slugs, `published=true`) and `blog_comments` (5 approved → `approved=true` with original timestamps; 2 pending → `approved=false`).

## Comment flow (spam controls)

`POST /api/createComment`:
1. Validate lengths (name ≤ 60, email valid, comment 1–2000 chars).
2. Honeypot field — filled → fake success, drop silently.
3. reCAPTCHA v2 server-side verification (existing site key; new `RECAPTCHA_SECRET_KEY` server-only var).
4. Heuristics: >2 links or empty → reject/hold.
5. Rate limit: ≤5/hour per IP hash (DB query; serverless-safe).
6. Insert `approved=false` + generate approval token; send EmailJS notification (new template, same Gmail service) to Gokul.
7. UI keeps current copy: "Thanks — it'll appear once approved."

## Approve-via-email (auth design)

- Token = `HMAC-SHA256(comment_id + expiry, APPROVAL_SECRET)`, 7-day TTL, hash stored on the row. Bearer token delivered only to Gokul's inbox.
- `GET /api/comments/approve?token=…` renders a **confirmation page** (comment text + Approve/Reject buttons), mutates nothing — email scanners prefetching links can't auto-approve.
- `POST` verifies signature + expiry + single-use, then flips `approved` (or deletes on reject) via service role, marks token used. Replays rejected.
- Accepted tradeoff: no password; worst case is one visible spam comment, unapproved in one click in Supabase.

## Code changes

- New `lib/blog.js` (Supabase, service-role): `getAllPostsWithSlug`, `getAllPostsForHome`, `getPostAndMorePosts` — same return shapes as `lib/api.js` to minimize page churn. Markdown rendered with `react-markdown`.
- `pages/blog.js`, `pages/posts/[slug].js`: swap import only. ISR `revalidate: 3600` stays.
- Rewrite `pages/api/createComment.js`; new `pages/api/comments/approve.js` (GET confirm page + POST mutate).
- `components/blog/form.js`: honeypot + `react-google-recaptcha` (same pattern as Contact).
- Delete: `@sanity/*`, `next-sanity`, `lib/sanity.js`, `lib/api.js`, `pages/api/preview.js`, `exit-preview.js`, `mock/fixtures.js` (markdown/DB need no offline mocks — `build:local` works without them; local dev needs Supabase access or a `.env.local`).
- Deps to add: `@supabase/supabase-js`, `@emailjs/nodejs` (server-side send), `react-markdown`.

## Vercel env vars (Gokul)

Server-only: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `EMAIL_JS_PRIVATE_KEY`, `RECAPTCHA_SECRET_KEY`, `APPROVAL_SECRET`, `NEXT_PUBLIC_SITE_URL` (for approve links). Keep existing `NEXT_PUBLIC_EMAIL_JS_*` (contact form). Remove Sanity vars after verification.

## EmailJS

New template "Blog comment notification" on service `service_vwzagg8`: to `admin@gokulmenon.com`; vars `post_title`, `post_slug`, `commenter_name`, `commenter_email`, `comment_text`, `approve_url`.

## Verification

- `npm run build:local` green; Firefox screenshots: blog listing, a post with images, comment form.
- Push to `master` per protocol (ref check, build, `rm -rf build`, snapshot push).
- Prod: spot-check migrated posts, submit a live test comment → approve via email link → appears within ISR window.
- Cleanup (separate): delete Sanity project once confident.

## Gokul's actions needed

1. Supabase project for the blog (or grant access to create it).
2. The 6 server-only Vercel env vars above.
3. Create the EmailJS notification template (content drafted during implementation).
