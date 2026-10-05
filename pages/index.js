import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Splash landing — the site's front door.
 *
 * Starfield hero with the site title and a single Enter button leading to
 * /intro. Content pages (intro, photos, …) carry the sticky SiteHeader nav;
 * the old overlay open/close flow is retired.
 *
 * The is-loading class drives the theme's intro reveal animation (header
 * fades/slides in once the class is removed shortly after mount).
 */
export default function Splash() {
  const [loading, setLoading] = useState('is-loading');

  useEffect(() => {
    const t = setTimeout(() => setLoading(''), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`body ${loading}`}>
      <Head>
        <title>Gokul Menon</title>
        <meta
          name="description"
          content="Gokul Menon, personal website, blog, photos, videos, games"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div id="wrapper" className="splash">
        <header id="header">
          <div className="content">
            <div className="inner">
              <h1>Gokul Menon</h1>
              <p>
                Welcome to the little corner of the internet that I can call
                my home in cyberspace.
                <br />
                This is yet another static website with blog built with free
                (as in free beer) open source software.
              </p>
            </div>
          </div>
          <div>
            <Link href="/intro" className="button special">
              Enter
            </Link>
          </div>
        </header>
      </div>

      <div id="bg" />
    </div>
  );
}
