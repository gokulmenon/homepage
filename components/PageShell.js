import Head from 'next/head';
import PropTypes from 'prop-types';
import SiteHeader from './SiteHeader';
import Footer from './Footer';

/**
 * PageShell — layout for every content page (intro, photos, videos, games,
 * podcasts, blog, contact).
 *
 * Replaces the old overlay article system (Base/Main): the article renders
 * statically inside the theme's #main panel, with the sticky SiteHeader on
 * top instead of the open/close hero dance. Keeps the starfield (#bg) and
 * the Dimension panel aesthetic.
 */
const PageShell = ({ active, articleId, title, headerTitle, children }) => (
  <div>
    <Head>
      <title>{title} | Gokul Menon</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Gokul Menon, personal website" />
    </Head>

    <div id="wrapper">
      <SiteHeader active={active} title={headerTitle} />
      <div id="main">
        <article id={articleId} className="active timeout">
          {children}
        </article>
      </div>
      <Footer />
    </div>

    <div id="bg" />
  </div>
);

PageShell.propTypes = {
  active: PropTypes.string.isRequired,
  articleId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  headerTitle: PropTypes.string,
  children: PropTypes.node,
};

export default PageShell;
