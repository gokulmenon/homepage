-- Games Arcade variants: deep-link `href` column + the 4 variant rows.
-- Variant entries link to subpaths of existing game deployments
-- (/games/<slug>/<path>), so they carry no deployment URL of their own.

alter table public.games add column if not exists href text;

insert into public.games
  (slug, title, description, category, tags, min_age, max_age,
   thumbnail_url, deployment_url, env_override, status, featured,
   sort_order, extra_asset_prefixes, href)
values
  ('number-hero-counting', 'Counting', 'Count the objects and tap the right number. 10 rounds with spoken numbers in English, Hindi and Spanish.', 'Math', '{"math","counting","numbers","audio"}', 4, NULL, '/images/games/number-hero-counting.jpg', NULL, NULL, 'live', false, 10, '{""}', '/games/number-hero/counting'),
  ('number-hero-addition', 'Addition', 'Simple sums read aloud in 3 languages. Tap the right answer and build a streak.', 'Math', '{"math","addition","numbers","audio"}', 5, NULL, '/images/games/number-hero-addition.jpg', NULL, NULL, 'live', false, 11, '{""}', '/games/number-hero/addition'),
  ('world-explorer-flags', 'Flags Sprint', '10 timed rounds: read the country name, tap the matching flag. Faster answers earn more points.', 'Geography', '{"geography","flags","quiz","timed"}', 6, NULL, '/images/games/world-explorer-flags.jpg', NULL, NULL, 'live', false, 12, '{""}', '/games/world-explorer/flags-sprint'),
  ('world-explorer-states', 'US States', 'Tap all 50 states on the map. Pinch to zoom the tiny ones, use region hints when stuck.', 'Geography', '{"geography","maps","usa","states"}', 7, NULL, '/images/games/world-explorer-states.jpg', NULL, NULL, 'live', false, 13, '{""}', '/games/world-explorer/us-states')
on conflict (slug) do nothing;
