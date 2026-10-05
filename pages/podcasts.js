import PageShell from '../components/PageShell';
import Podcasts from '../components/Podcasts';

export default function PodcastsPage() {
  return (
    <PageShell active="podcasts" articleId="podcasts" title="Podcasts">
      <Podcasts />
    </PageShell>
  );
}
