import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import SiteHeader from '../../components/SiteHeader';
import Footer from '../../components/Footer';
import GameSearch from '../../components/games/GameSearch';
import { listGames, loadGames, searchGames, getCategories } from '../../lib/games-registry';

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

function GameCard({ game }) {
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
      <div key={game.id} className={`${cardClass} opacity-70 cursor-default`}>
        {body}
      </div>
    );
  }
  return (
    <Link key={game.id} href={`/games/${game.slug}`} className={`${cardClass} hover:border-white/40`}>
      {body}
    </Link>
  );
}

export default function GamesHub({ initialGames }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [category, setCategory] = useState('all');
  const [maxAge, setMaxAge] = useState('all');

  const allGames =
    initialGames && initialGames.length ? initialGames : listGames();
  const categories = useMemo(() => getCategories(allGames), [allGames]);
  const results = useMemo(
    () =>
      searchGames(
        query,
        {
          sort,
          category,
          maxAge: maxAge === 'all' ? null : Number(maxAge),
        },
        allGames
      ),
    [query, sort, category, maxAge, allGames]
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
      </Head>

      <SiteHeader active="games" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10 flex-1 w-full">
        <p className="mb-5 text-sm text-white/50 text-center sm:text-left">
          Pick a game to play. Progress is saved on this device.
        </p>

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
          totalCount={allGames.length}
        />

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((game) => (
              <GameCard key={game.id} game={game} />
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
