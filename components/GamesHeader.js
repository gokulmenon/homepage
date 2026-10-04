import Link from 'next/link';

/**
 * GamesHeader — compact sticky header for the Games Arcade (/games).
 *
 * The shared Dimension <Header> (home icon, title block, welcome paragraph,
 * tall nav) eats ~2 screens on mobile before the first game card. This
 * header is slim and sticky: a ‹ Home link, the arcade title, and a
 * horizontally scrollable nav row. Used only by pages/games/index.js so the
 * rest of the site keeps its theme header.
 */
const NAV_ITEMS = [
  { href: '/intro', label: 'Intro' },
  { href: '/photos', label: 'Photos' },
  { href: '/videos', label: 'Videos' },
  { href: '/games', label: 'Games' },
  { href: '/podcasts', label: 'Podcasts' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const GamesHeader = () => (
  <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-11">
        <Link href="/" className="text-sm font-semibold text-gray-400 hover:text-white">
          &#8249; Home
        </Link>
        <span className="text-sm font-extrabold tracking-[0.2em] text-white">
          GAMES ARCADE
        </span>
        {/* spacer keeps the title centered */}
        <span className="w-12" aria-hidden="true" />
      </div>
      <nav aria-label="Site" className="overflow-x-auto -mx-4 px-4">
        <ul className="flex gap-1.5 pb-2 whitespace-nowrap">
          {NAV_ITEMS.map((item) => {
            const active = item.href === '/games';
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  </header>
);

export default GamesHeader;
