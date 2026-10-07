import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/blog/container'
import PostBody from '../../components/blog/post-body'
import MoreStories from '../../components/blog/more-stories'
import PostHeader from '../../components/blog/post-header'
import Comments from '../../components/blog/comments'
import SectionSeparator from '../../components/blog/section-separator'
import Layout from '../../components/blog/layout'
import { getAllPostsWithSlug, getPostAndMorePosts, readingTimeFor } from '../../lib/blog'
import PostTitle from '../../components/blog/post-title'
import Head from 'next/head'
import Footer from "../../components/Footer"
import SiteHeader from '../../components/SiteHeader'
import SeoMeta from '../../components/SeoMeta'
// Using inline SVG for back icon to avoid loading FontAwesome for a single icon
import Form from '../../components/blog/form'

export default function Post({ post, morePosts, readingTime }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  let close = <div className="close" onClick={() => { router.push('/blog') }}></div>
  let back = <div className="back" onClick={() => { router.back() }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"/></svg>
            </div>
  return (
    <div className="body">
      <div>
        <Head>
          <title>{post ? post.title: ""} - Gokul Menon Blog</title>
        </Head>
        {post && (
          <SeoMeta
            title={`${post.title} - Gokul Menon Blog`}
            description={post.excerpt || post.title}
            path={`/posts/${post.slug}`}
            image={post.coverImage}
            type="article"
          />
        )}
        <SiteHeader active="blog" />
        <div id="wrapper">
          <div id="main" style={{ display: 'flex' }}>
            <article id="blog-post" className="active timeout">
              <Layout>
                <Container>
                  {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                  ) : (
                    <>
                      <PostHeader
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        author={post.author}
                        readingTime={readingTime}
                      />
                      <PostBody markdown={post.body_markdown} />

                      <Comments comments={post.comments} />
                      <Form postSlug={post.slug} />

                      <SectionSeparator />
                      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                    </>
                  )}
                </Container>
              </Layout>
              {back}
              {close}
            </article>
          </div>
          <Footer />
        </div>
        <div id="bg" />
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPostAndMorePosts(params.slug)
  return {
    props: {
      post: data?.post || null,
      morePosts: data?.morePosts || null,
      readingTime: readingTimeFor(data?.post?.body_markdown),
    },
    revalidate: 3600
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          //TODO remove this arbitory string once bug is fixed for missing slug
          slug: post.slug || "r",
        },
      })) || [],
    fallback: true,
  }
}
