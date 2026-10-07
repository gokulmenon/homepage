import Head from 'next/head';
import PropTypes from 'prop-types';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import SeoMeta from './SeoMeta';

/**
 * PageShell — layout for every content page (intro, photos, videos, games,
 * podcasts, blog, contact).
 *
 * Replaces the old overlay article system (Base/Main): the article renders
 * statically inside the theme's #main panel, with the sticky SiteHeader on
 * top instead of the open/close hero dance. Keeps the starfield (#bg) and
 * the Dimension panel aesthetic.
 */
const TAB_DESCRIPTIONS = {
  intro: 'Gokul Menon — applied AI engineer in New Jersey, working on live video infrastructure.',
  photos: 'Astrophotography and photos by Gokul Menon.',
  videos: 'Videos from Gokul Menon on YouTube.',
  podcasts: 'Podcast episodes by Gokul Menon.',
  blog: 'Essays and notes by Gokul Menon on engineering, AI, and building things.',
  contact: 'Get in touch with Gokul Menon.',
};

const PageShell = ({ active, articleId, title, description, image, children }) => (
  <div>
    <Head>
      <title>{title} | Gokul Menon</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Gokul Menon, personal website" />
    </Head>
    <SeoMeta
      title={`${title} | Gokul Menon`}
      description={description || TAB_DESCRIPTIONS[active] || 'Gokul Menon, personal website'}
      path={`/${active}`}
      image={image}
    />

    <SiteHeader active={active} />

    <div id="wrapper">
      <div id="main" style={{ display: 'flex' }}>
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
  description: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
};

export default PageShell;
