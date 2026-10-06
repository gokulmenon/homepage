-- Games Arcade round-3 variants: insert the 9 new variant rows.

insert into public.games
  (slug, title, description, category, tags, min_age, max_age,
   thumbnail_url, deployment_url, env_override, status, featured,
   sort_order, extra_asset_prefixes, href)
values
  ('number-hero-telling-time', 'Telling Time', 'Read the analog clock. Hours and halves, then quarter hours.', 'Math', '{"math","time","clock","numbers"}', 6, NULL, '/images/games/number-hero-telling-time.jpg', NULL, NULL, 'live', false, 20, '{}', '/games/number-hero/telling-time'),
  ('number-hero-counting-coins', 'Counting Coins', 'Pennies, nickels, dimes, quarters. How much money?', 'Math', '{"math","money","coins","numbers"}', 6, NULL, '/images/games/number-hero-counting-coins.jpg', NULL, NULL, 'live', false, 21, '{}', '/games/number-hero/counting-coins'),
  ('number-hero-skip-counting', 'Skip Counting', 'Count by 2s, 5s and 10s. Find the missing number.', 'Math', '{"math","skip-counting","sequences","numbers"}', 6, NULL, '/images/games/number-hero-skip-counting.jpg', NULL, NULL, 'live', false, 22, '{}', '/games/number-hero/skip-counting'),
  ('number-hero-number-order', 'Number Order', 'Tap five numbers from smallest to biggest.', 'Math', '{"math","ordering","comparison","numbers"}', 5, NULL, '/images/games/number-hero-number-order.jpg', NULL, NULL, 'live', false, 23, '{}', '/games/number-hero/number-order'),
  ('number-hero-odd-even', 'Odd & Even', 'Tap all the even numbers. Then all the odd ones.', 'Math', '{"math","odd-even","parity","numbers"}', 6, NULL, '/images/games/number-hero-odd-even.jpg', NULL, NULL, 'live', false, 24, '{}', '/games/number-hero/odd-even'),
  ('world-explorer-continents', 'Continents', 'Which continent is it in? 10 timed rounds across 33 countries.', 'Geography', '{"geography","continents","quiz","world"}', 6, NULL, '/images/games/world-explorer-continents.jpg', NULL, NULL, 'live', false, 25, '{}', '/games/world-explorer/continents'),
  ('world-explorer-landmarks', 'Landmarks', 'See a famous landmark, name its country.', 'Geography', '{"geography","landmarks","quiz","world"}', 6, NULL, '/images/games/world-explorer-landmarks.jpg', NULL, NULL, 'live', false, 26, '{}', '/games/world-explorer/landmarks'),
  ('world-explorer-currencies', 'Currencies', 'What money do they use? Yen, euros, rupees and more.', 'Geography', '{"geography","currencies","money","quiz"}', 7, NULL, '/images/games/world-explorer-currencies.jpg', NULL, NULL, 'live', false, 27, '{}', '/games/world-explorer/currencies'),
  ('world-explorer-languages', 'Languages', 'What language do they speak? 10 timed rounds.', 'Geography', '{"geography","languages","quiz","world"}', 7, NULL, '/images/games/world-explorer-languages.jpg', NULL, NULL, 'live', false, 28, '{}', '/games/world-explorer/languages')
on conflict (slug) do nothing;

-- Cleanup: round-2 migration wrote '{"\"\"}' ([""]) instead of '{}'.
update public.games set extra_asset_prefixes = '{}'
where extra_asset_prefixes = array['']::text[];
