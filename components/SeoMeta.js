import Head from 'next/head';
import PropTypes from 'prop-types';

export const SITE_URL = 'https://gokulmenon.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/android-chrome-512x512.png`;

/**
 * SeoMeta — Open Graph + Twitter Card tags for link previews.
 * Pages own their <title>; this only emits meta tags. All URLs are
 * absolute (crawlers require it for og:image / og:url).
 */
const SeoMeta = ({ title, description, path = '/', image, type = 'website' }) => {
  const url = `${SITE_URL}${path}`;
  const img = image && image.startsWith('http') ? image : image ? `${SITE_URL}${image}` : DEFAULT_OG_IMAGE;
  return (
    <Head>
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Gokul Menon" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Head>
  );
};

SeoMeta.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
};

export default SeoMeta;
