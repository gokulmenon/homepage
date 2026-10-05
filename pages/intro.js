import PageShell from '../components/PageShell';
import Intro from '../components/Intro';

export default function IntroPage() {
  return (
    <PageShell active="intro" articleId="intro" title="Intro">
      <Intro />
    </PageShell>
  );
}
