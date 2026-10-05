import Link from 'next/link';

/**
 * GamesHeader — compact sticky header for the Games Arcade (/games).
 *
 * Speaks the Dimension theme's visual dialect so the arcade feels native:
 * #1b1f22 ground, hairline white borders, uppercase micro-type with wide
 * tracking. (The shared <Header> stays untouched for the rest of the site.)
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
  <header
    className="sticky top-0 z-50 border-b border-white/15 backdrop-blur-md"
    style={{ backgroundColor: 'rgba(27, 31, 34, 0.95)' }}
  >
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-11">
        <Link
          href="/"
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
        >
          &#8249; Home
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white">
          Games Arcade
        </span>
        {/* spacer keeps the title centered */}
        <span className="w-12" aria-hidden="true" />
      </div>
      <nav aria-label="Site" className="overflow-x-auto -mx-4 px-4">
        <ul className="flex whitespace-nowrap border-t border-white/10 list-none">
          {NAV_ITEMS.map((item) => {
            const active = item.href === '/games';
            return (
              <li
                key={item.href}
                className="border-l border-white/10 first:border-l-0"
              >
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? 'text-white bg-white/10'
                      : 'text-white/55 hover:text-white hover:bg-white/5'
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
