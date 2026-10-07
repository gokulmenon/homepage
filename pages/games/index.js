import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SiteHeader from '../../components/SiteHeader';
import Footer from '../../components/Footer';
import GameSearch from '../../components/games/GameSearch';
import { listGames, loadGames, searchGames, getCategories } from '../../lib/games-registry';
import { getRecentlyPlayedSlugs, recordPlay } from '../../lib/recently-played';

// Build-time catalog: Supabase when configured, static JSON fallback otherwise.
export async function getStaticProps() {
  const initialGames = await loadGames();
  return { props: { initialGames } };
}

// Real per-game screenshots (public/images/games/<slug>.jpg), captured with
// headless Firefox and cropped to 16:9. Re-capture with
// ~/workspace/thumbs/capture.js if a game's look changes.
function GameTile({ game }) {
  return (
    <div className="relative w-full h-48 overflow-hidden" aria-hidden="true">
      <img
        src={game.thumbnail}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover object-top"
      />
      <span className="absolute top-3 right-3 bg-black/50 border border-white/20 text-white text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded backdrop-blur-sm">
        {game.category}
      </span>
      {!game.live && (
        <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          Coming soon
        </span>
      )}
    </div>
  );
}

function GameCard({ game, onPlay }) {
  const cardClass =
    'group relative bg-white/[0.04] rounded overflow-hidden border border-white/15 shadow-lg transition-all duration-200 flex flex-col';
  const body = (
    <>
      <GameTile game={game} />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            {game.title}
          </h2>
          <p className="mt-2 text-sm text-white/55 line-clamp-2">{game.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-white/40">
          <span>Ages {game.ageGroup}</span>
          {game.live ? (
            <span className="text-white font-medium uppercase tracking-[0.15em] text-[11px] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Play Now &rarr;
            </span>
          ) : (
            <span className="text-white/30 font-medium">Not deployed yet</span>
          )}
        </div>
      </div>
    </>
  );

  if (!game.live) {
    return (
      <div className={`${cardClass} opacity-70 cursor-default`}>
        {body}
      </div>
    );
  }
  return (
    <Link
      href={game.href || `/games/${game.slug}`}
      onClick={() => onPlay?.(game)}
      className={`${cardClass} hover:border-white/40`}
    >
      {body}
    </Link>
  );
}

function RecentCard({ game, onPlay }) {
  return (
    <Link
      href={game.href || `/games/${game.slug}`}
      onClick={() => onPlay?.(game)}
      className="group relative flex-shrink-0 w-40 bg-white/[0.04] rounded overflow-hidden border border-white/15 hover:border-white/40 transition-all duration-200"
    >
      <div className="w-full h-24 overflow-hidden">
        <img
          src={game.thumbnail}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <p className="px-3 py-2 text-sm font-bold text-white truncate">{game.title}</p>
    </Link>
  );
}

export default function GamesHub({ initialGames }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [category, setCategory] = useState('all');
  const [maxAge, setMaxAge] = useState('all');
  const [games, setGames] = useState(
    initialGames && initialGames.length ? initialGames : listGames()
  );
  const [recentSlugs, setRecentSlugs] = useState([]);

  const handlePlay = (game) => {
    setRecentSlugs(recordPlay(game.slug));
  };

  // Self-heal the catalog on mount: rows added to Supabase after the build
  // (e.g. while a migration was still applying) show up without a redeploy.
  useEffect(() => {
    let cancelled = false;
    setRecentSlugs(getRecentlyPlayedSlugs());
    loadGames().then((fresh) => {
      if (cancelled || !fresh.length) return;
      const sig = (list) => list.map((g) => g.slug).join(',');
      setGames((prev) => (sig(prev) === sig(fresh) ? prev : fresh));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => getCategories(games), [games]);
  const recentGames = useMemo(
    () =>
      recentSlugs
        .map((slug) => games.find((g) => g.slug === slug))
        .filter(Boolean)
        .slice(0, 6),
    [recentSlugs, games]
  );
  const results = useMemo(
    () =>
      searchGames(
        query,
        {
          sort,
          category,
          maxAge: maxAge === 'all' ? null : Number(maxAge),
        },
        games
      ),
    [query, sort, category, maxAge, games]
  );

  return (
    <div className="min-h-screen bg-[#1b1f22] text-white flex flex-col justify-between">
      <Head>
        <title>Games Arcade | Gokul Menon</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta
          name="description"
          content="Fun learning games for kids — math, geography, phonics, memory and more. Pick a game and play."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Gokul Menon" />
        <meta property="og:title" content="Games Arcade | Gokul Menon" />
        <meta
          property="og:description"
          content="Fun learning games for kids — math, geography, phonics, memory and more. Pick a game and play."
        />
        <meta property="og:url" content="https://gokulmenon.com/games" />
        <meta property="og:image" content="https://gokulmenon.com/images/games/number-hero.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Games Arcade | Gokul Menon" />
        <meta
          name="twitter:description"
          content="Fun learning games for kids — math, geography, phonics, memory and more. Pick a game and play."
        />
        <meta name="twitter:image" content="https://gokulmenon.com/images/games/number-hero.jpg" />
      </Head>

      <SiteHeader active="games" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10 flex-1 w-full">
        <p className="mb-5 text-sm text-white/50 text-center sm:text-left">
          Pick a game to play. Progress is saved on this device.
          <span className="text-white/30"> · {games.length} games</span>
        </p>

        {recentGames.length > 0 && (
          <section aria-label="Recently played" className="mb-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-white/50">
              Recently played
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              {recentGames.map((game) => (
                <RecentCard key={game.slug} game={game} onPlay={handlePlay} />
              ))}
            </div>
          </section>
        )}

        <GameSearch
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          maxAge={maxAge}
          onMaxAgeChange={setMaxAge}
          resultCount={results.length}
          totalCount={games.length}
        />

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((game) => (
              <GameCard key={game.id} game={game} onPlay={handlePlay} />
            ))}
          </div>
        ) : (
          <div className="rounded border border-white/10 bg-white/[0.03] px-6 py-14 text-center">
            <p className="text-lg font-semibold text-white/80">No games found</p>
            <p className="mt-2 text-sm text-white/50">
              Try a different word, or clear the filters to see everything.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
