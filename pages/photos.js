import PageShell from '../components/PageShell';
import Photos from '../components/Photos';

export default function PhotosPage() {
  return (
    <PageShell active="photos" articleId="photos" title="Photos">
      <Photos />
    </PageShell>
  );
}
