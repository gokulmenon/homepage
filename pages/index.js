import Head from 'next/head';
import Link from 'next/link';

/**
 * Splash landing — the site's front door.
 *
 * Starfield hero with the site title and a single Enter button leading to
 * /intro. Content pages (intro, photos, …) carry the sticky SiteHeader nav;
 * the old overlay open/close flow is retired.
 */
export default function Splash() {
  return (
    <div>
      <Head>
        <title>Gokul Menon</title>
        <meta
          name="description"
          content="Gokul Menon, personal website, blog, photos, videos, games"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div id="wrapper">
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
