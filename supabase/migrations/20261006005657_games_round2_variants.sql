-- Games Arcade round-2 variants: insert the 6 new variant rows.
-- (`href` column was added by the round-1 migration.)

insert into public.games
  (slug, title, description, category, tags, min_age, max_age,
   thumbnail_url, deployment_url, env_override, status, featured,
   sort_order, extra_asset_prefixes, href)
values
  ('number-hero-subtraction', 'Subtraction', 'Take-away equations read aloud in 3 languages. Answers stay friendly and non-negative.', 'Math', '{"math","subtraction","numbers","audio"}', 6, NULL, '/images/games/number-hero-subtraction.jpg', NULL, NULL, 'live', false, 14, '{""}', '/games/number-hero/subtraction'),
  ('number-hero-missing', 'Missing Number', 'What comes next? Complete the number sequence — by 1s, 2s, 5s and 10s.', 'Math', '{"math","sequences","patterns","numbers"}', 5, NULL, '/images/games/number-hero-missing.jpg', NULL, NULL, 'live', false, 15, '{""}', '/games/number-hero/missing-number'),
  ('number-hero-compare', 'Bigger or Smaller', 'Two big numbers — tap the bigger one. Or the smaller one. Tricky!', 'Math', '{"math","comparison","numbers"}', 4, NULL, '/images/games/number-hero-compare.jpg', NULL, NULL, 'live', false, 16, '{""}', '/games/number-hero/bigger-smaller'),
  ('number-hero-bonds', 'Number Bonds', 'Which number completes the bond? Pairs that make 10, then 20.', 'Math', '{"math","addition","number-bonds","numbers"}', 6, NULL, '/images/games/number-hero-bonds.jpg', NULL, NULL, 'live', false, 17, '{""}', '/games/number-hero/number-bonds'),
  ('world-explorer-capitals', 'Capitals', '10 timed rounds: read the country, tap its capital city. 40 countries to master.', 'Geography', '{"geography","capitals","quiz","timed"}', 8, NULL, '/images/games/world-explorer-capitals.jpg', NULL, NULL, 'live', false, 18, '{""}', '/games/world-explorer/capitals'),
  ('world-explorer-uscapitals', 'US Capitals', '10 timed rounds: read the state, tap its capital. All 50 capitals to master.', 'Geography', '{"geography","capitals","usa","timed"}', 8, NULL, '/images/games/world-explorer-uscapitals.jpg', NULL, NULL, 'live', false, 19, '{""}', '/games/world-explorer/us-capitals')
on conflict (slug) do nothing;
