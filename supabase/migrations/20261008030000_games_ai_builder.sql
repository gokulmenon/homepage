-- Games Arcade: AI Math Game Builder (number_hero prompt-to-game generator).

insert into public.games
  (slug, title, description, category, tags, min_age, max_age,
   thumbnail_url, deployment_url, env_override, status, featured,
   sort_order, extra_asset_prefixes, href)
values
  ('number-hero-ai-builder', 'AI Math Game Builder', 'Describe any math game and watch AI build it — with custom pictures. 10 rounds, endless ideas.', 'Math', '{"math","ai","creative"}', 4, NULL, '/images/games/ai-math-game-builder.jpg', NULL, NULL, 'live', true, 5, '{}', '/games/number-hero/ai-math-game-builder')
on conflict (slug) do nothing;
