-- Blog tables: posts + comments (Sanity.io migration, Oct 2026).
-- Applied automatically via the Supabase GitHub integration on push to master.

create table if not exists blog_posts (
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

create table if not exists blog_comments (
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

create index if not exists blog_comments_post_approved_idx
  on blog_comments (post_id) where (approved = true);

alter table blog_posts enable row level security;
alter table blog_comments enable row level security;
-- No public policies: all access goes through the service-role key,
-- used server-side only (getStaticProps / API routes).
