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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Form from '../../components/blog/form'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  let close = <div className="close" onClick={() => { router.push('/') }}></div>
  let back = <div className="back" onClick={() => { router.back() }}>
              <FontAwesomeIcon icon={faArrowLeft} width="30px"/>
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
    revalidate: 1
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
