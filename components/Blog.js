
import PropTypes from 'prop-types';
import React from "react"
import Container from '../components/blog/container'
import MoreStories from '../components/blog/more-stories'
import HeroPost from '../components/blog/hero-post'
import Intro from '../components/blog/intro'
import Layout from '../components/blog/layout'
import Head from 'next/head'

class Blog extends React.Component {
  render() {
    const heroPost = this.props.allPosts[0]
    const morePosts = this.props.allPosts.slice(1)
    return (
      <div>
        <h2 className="major">Blog</h2>        
        <Layout>
          <Head>
            <title>Gokul Menon Blog</title>
          </Head>
          <Container>
            <Intro />
            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
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