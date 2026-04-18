import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/blog/container'
import PostBody from '../../components/blog/post-body'
import MoreStories from '../../components/blog/more-stories'
import PostHeader from '../../components/blog/post-header'
import Comments from '../../components/blog/comments'
import SectionSeparator from '../../components/blog/section-separator'
import Layout from '../../components/blog/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import PostTitle from '../../components/blog/post-title'
import Head from 'next/head'
import Footer from "../../components/Footer"
// Using inline SVG for back icon to avoid loading FontAwesome for a single icon
import Form from '../../components/blog/form'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  let close = <div className="close" onClick={() => { router.push('/') }}></div>
  let back = <div className="back" onClick={() => { router.back() }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"/></svg>
            </div>
  return (
    <div className="body is-article-visible">
      <div>
        <Head>
          <title>{post ? post.title: ""} - Gokul Menon Blog</title>
        </Head>
        <div id="wrapper">
          <div id="main" style={{ display: 'flex' }}>
            <article id="blog posts" className="active timeout" style={{ display: 'none' }}>
              <Layout preview={preview}>
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
                      />
                      <PostBody content={post.body} />

                      <Comments comments={post.comments} />
                      <Form _id={post._id} />

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
          <Footer timeout={true} />
        </div>
        <div id="bg" />
      </div>
    </div>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  return {
    props: {
      preview,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
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
