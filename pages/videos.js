import PageShell from '../components/PageShell';
import Videos from '../components/Videos';
import { getAllPlaylistItems } from '../lib/youtube';

export default function VideosPage({ youtubeVideos }) {
  return (
    <PageShell active="videos" articleId="videos" title="Videos">
      <Videos youtubeVideos={youtubeVideos} />
    </PageShell>
  );
}

export async function getStaticProps() {
  const youtubeVideos = await getAllPlaylistItems();
  return {
    props: { youtubeVideos },
    revalidate: 3600,
  };
}
