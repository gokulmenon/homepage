
import PropTypes from 'prop-types';
import React from "react"
import Container from '../components/blog/container'
import MoreStories from '../components/blog/more-stories'
import PostPreview from '../components/blog/post-preview'
import HeroPost from '../components/blog/hero-post'
import Intro from '../components/blog/intro'
import Layout from '../components/blog/layout'
import Head from 'next/head'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { query: '' }
  }

  render() {
    const { allPosts } = this.props
    const q = this.state.query.trim().toLowerCase()
    const results = q
      ? allPosts.filter((p) =>
          `${p.title} ${p.excerpt || ''}`.toLowerCase().includes(q)
        )
      : null
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)
    return (
      <div>
        <h2 className="major">Blog</h2>        
        <Layout>
          <Head>
            <title>Gokul Menon Blog</title>
          </Head>
          <Container>
            <Intro />
            <div style={{ marginBottom: '2rem' }}>
              <input
                type="text"
                placeholder="Search posts…"
                aria-label="Search blog posts"
                value={this.state.query}
                onChange={(e) => this.setState({ query: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>
            {results ? (
              <section>
                <h3 className="mb-4 text-left tracking-tighter leading-tight">
                  {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{this.state.query.trim()}&rdquo;
                </h3>
                {results.length === 0 ? (
                  <p>No posts match that search. Try something else.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-1 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32 divide-y divide-accent-2">
                    {results.map((post) => (
                      <PostPreview
                        key={post.slug}
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        author={post.author}
                        slug={post.slug}
                        excerpt={post.excerpt}
                        readingTime={post.readingTime}
                      />
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <>
                {heroPost && (
                  <HeroPost
                    title={heroPost.title}
                    coverImage={heroPost.coverImage}
                    date={heroPost.date}
                    author={heroPost.author}
                    slug={heroPost.slug}
                    excerpt={heroPost.excerpt}
                    readingTime={heroPost.readingTime}
                  />
                )}
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
              </>
            )}
          </Container>
        </Layout>
      </div>
    );
  }
}


Blog.propTypes = {
  onCloseArticle: PropTypes.func,
  allPosts:PropTypes.array,
}

export default Blog
