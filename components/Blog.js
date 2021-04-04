
import PropTypes from 'prop-types';
import React from "react"
import Container from '../components/blog/container'
import MoreStories from '../components/blog/more-stories'
import HeroPost from '../components/blog/hero-post'
import Intro from '../components/blog/intro'
import Layout from '../components/blog/layout'
import Head from 'next/head'
import { withRouter } from 'next/router'

class Blog extends React.Component {
  constructor(props) {
      super(props)
      this.router = props.router;
      this.handleCloseArticle = this.handleCloseArticle.bind(this)
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }
  
    componentDidMount() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
    
    handleKeyDown(event) {
      const ESC_KEY = 27;
      const key = parseInt(event.keyCode || event.which || 0, 10);
      if (key===ESC_KEY){
        this.handleCloseArticle();
      }
    }

  handleCloseArticle() {
    this.router.push("/");
  }

  render() {
    let close = <div className="close" onClick={() => { this.handleCloseArticle() }}></div>;
    const heroPost = this.props.allPosts[0]
    const morePosts = this.props.allPosts.slice(1)
    return (
      <div>
        <h2 className="major">Blog</h2>        
        <Layout preview={this.props.preview}>
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
        {close}
      </div>
    );
  }
}


Blog.propTypes = {
  onCloseArticle: PropTypes.func,
  allPosts:PropTypes.array,
  preview:PropTypes.bool
}

export default withRouter(Blog)