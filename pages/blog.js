import PageShell from '../components/PageShell';
import Blog from '../components/Blog';
import { getAllPostsForHome } from '../lib/api';

export default function BlogPage({ allPosts, preview }) {
  return (
    <PageShell active="blog" articleId="blog" title="Blog">
      <Blog allPosts={allPosts} preview={preview} />
    </PageShell>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 3600,
  };
}
