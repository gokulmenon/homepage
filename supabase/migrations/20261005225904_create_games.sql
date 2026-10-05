-- Games Arcade registry: `games` table + public read RLS + seed of the 9 launch games.
--
-- Shape mirrors data/games.json (the Phase 0 static source of truth) so the
-- registry can swap backends without changing the hub. `env_override` keeps
-- the Vercel env-var URL indirection for existing games during transition;
-- new games should set `deployment_url` directly.

create table public.games (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  category text,
  tags text[] not null default '{}',
  min_age int,
  max_age int,
  thumbnail_url text,
  deployment_url text,
  env_override text,
  status text not null default 'live'
    check (status in ('live', 'coming_soon', 'deprecated')),
  featured boolean not null default false,
  sort_order int not null default 0,
  extra_asset_prefixes text[] not null default '{}',
  play_count bigint not null default 0,
  search_vector tsvector generated always as (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(description, '') || ' ' ||
      coalesce(category, ''))
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index games_search_vector_idx on public.games using gin (search_vector);
create index games_tags_idx on public.games using gin (tags);
create index games_status_sort_idx on public.games (status, sort_order);

alter table public.games enable row level security;

-- Public read-only: the arcade hub is a public page. Writes go through the
-- service role (server-side admin), never the anon key.
create policy "Public read access"
  on public.games for select
  using (true);

create or replace function public.games_touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger games_updated_at
  before update on public.games
  for each row execute function public.games_touch_updated_at();

-- Seed the 9 launch games. Idempotent: re-running keeps existing rows.
insert into public.games
  (slug, title, description, category, tags, min_age, max_age,
   thumbnail_url, deployment_url, env_override, status, featured,
   sort_order, extra_asset_prefixes)
values
  ('memory-game', 'Memory Game', 'Classic card-match memory game. Match the tiles faster to score in this old classic.', 'Memory', '{"memory","cards","matching","classic"}', 4, NULL, '/images/games/memory-game.jpg', 'https://gokulmenon.github.io/memory_game', 'NEXT_PUBLIC_MEMORY_GAME_URL', 'live', true, 1, '{}'),
  ('snakes-ladders', 'Snakes & Ladders', 'Roll the dice, climb the ladders, dodge the snakes. An age old game of chance.', 'Board', '{"board","dice","chance","classic"}', 4, NULL, '/images/games/snakes-ladders.jpg', 'https://gokulmenon.github.io/snakes-and-ladder', 'NEXT_PUBLIC_SNAKES_LADDERS_URL', 'live', false, 2, '{}'),
  ('trivia', 'Trivia', 'Math, reading and geography trivia for kids. Edufun!', 'Quiz', '{"quiz","math","reading","geography","education"}', 5, NULL, '/images/games/trivia.jpg', 'https://gokulmenon.github.io/trivia_game', 'NEXT_PUBLIC_TRIVIA_URL', 'live', false, 3, '{}'),
  ('number-hero', 'Number Hero', 'Learn numbers 1–100 in English, Hindi and Spanish, with spoken audio.', 'Math', '{"math","numbers","counting","audio","languages"}', 4, NULL, '/images/games/number-hero.jpg', 'https://number-hero.vercel.app', 'NEXT_PUBLIC_NUMBER_HERO_URL', 'live', true, 4, '{}'),
  ('zero-hero', 'Zero Hero', 'Big numbers, fun facts and spoken number names.', 'Math', '{"math","numbers","big numbers","audio"}', 6, NULL, '/images/games/zero-hero.jpg', 'https://zero-hero-swart.vercel.app', 'NEXT_PUBLIC_ZERO_HERO_URL', 'live', false, 5, '{}'),
  ('vowel-sounds', 'Vowel Sounds', 'Practice vowel sounds with the chart and audio.', 'Language', '{"language","phonics","vowels","audio","reading"}', 4, NULL, '/images/games/vowel-sounds.jpg', 'https://gokulmenon.github.io/vowel_sounds', 'NEXT_PUBLIC_VOWEL_SOUNDS_URL', 'live', false, 6, '{}'),
  ('vocab-venture', 'Vocab Venture', 'Word adventures with AI-generated lists and spoken audio.', 'Language', '{"language","words","vocabulary","audio"}', 7, NULL, '/images/games/vocab-venture.jpg', 'https://vocab-venture.vercel.app', 'NEXT_PUBLIC_VOCAB_VENTURE_URL', 'live', false, 7, '{}'),
  ('monopoly', 'Monopoly', 'Monopoly deal-style card game. 4 player classic board game.', 'Board', '{"board","cards","multiplayer","classic","strategy"}', 8, NULL, '/images/games/monopoly.jpg', 'https://monopoly-taupe.vercel.app', 'NEXT_PUBLIC_MONOPOLY_URL', 'live', false, 8, '{}'),
  ('world-explorer', 'World Explorer', 'Explore world geography, flags and landmarks in an interactive quest. Players have to pick the answers by selecting the countries on a map.', 'Geography', '{"geography","maps","flags","landmarks","quiz"}', 7, NULL, '/images/games/world-explorer.jpg', 'https://world-explorer-rose.vercel.app', 'NEXT_PUBLIC_WORLD_EXPLORER_URL', 'live', true, 9, '{"/_expo"}')
on conflict (slug) do nothing;
