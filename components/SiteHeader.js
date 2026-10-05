import Link from 'next/link';
import PropTypes from 'prop-types';

/**
 * SiteHeader — sticky top nav used by every content page (intro, photos,
 * videos, games, podcasts, blog, contact).
 *
 * Speaks the Dimension theme's visual dialect: #1b1f22 ground, hairline
 * white borders, uppercase micro-type with wide tracking. `active` is the
 * current tab's slug and gets the highlighted state.
 */
const NAV_ITEMS = [
  { slug: 'intro', href: '/intro', label: 'Intro' },
  { slug: 'photos', href: '/photos', label: 'Photos' },
  { slug: 'videos', href: '/videos', label: 'Videos' },
  { slug: 'games', href: '/games', label: 'Games' },
  { slug: 'podcasts', href: '/podcasts', label: 'Podcasts' },
  { slug: 'blog', href: '/blog', label: 'Blog' },
  { slug: 'contact', href: '/contact', label: 'Contact' },
];

const SiteHeader = ({ active }) => {
  const activeItem = NAV_ITEMS.find((item) => item.slug === active);
  const title = activeItem ? `Gokul Menon | ${activeItem.label}` : 'Gokul Menon';
  return (
  <header
    className="sticky top-0 z-50 w-full border-b border-white/15 backdrop-blur-md"
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
          {title}
        </span>
        {/* spacer keeps the title centered */}
        <span className="w-12" aria-hidden="true" />
      </div>
      <nav aria-label="Site" className="overflow-x-auto -mx-4 px-4">
        <ul className="flex whitespace-nowrap border-t border-white/10 list-none">
          {NAV_ITEMS.map((item) => {
            const isActive = item.slug === active;
            return (
              <li
                key={item.href}
                className="border-l border-white/10 first:border-l-0"
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                    isActive
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
};

SiteHeader.propTypes = {
  active: PropTypes.string,
};

export default SiteHeader;
