import PageShell from '../components/PageShell';
import Blog from '../components/Blog';
import { getAllPostsForHome } from '../lib/blog';

export default function BlogPage({ allPosts }) {
  return (
    <PageShell active="blog" articleId="blog" title="Blog">
      <Blog allPosts={allPosts} />
    </PageShell>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPostsForHome();
  return {
    props: { allPosts },
    revalidate: 3600,
  };
}
