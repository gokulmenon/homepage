import Head from "next/head"
import React from "react"
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"
import PropTypes from 'prop-types';

const Base = (props) => (
  <div className={`body ${props.state.loading} ${props.state.isArticleVisible ? "is-article-visible" : ""}`}>
    <div>
      <Head>
        <title>Gokul Menon Homepage</title>
        <meta name='description' content='Gokul Menon , Meta Engineer, personal website, personal blog, technology nerd, geek, astrophotographer'></meta>
        <meta httpEquiv='content-language' content='en-us'></meta>
      </Head>


      <div id="wrapper">
        <Header timeout={props.state.timeout} />
        <Main
          isArticleVisible={props.state.isArticleVisible}
          timeout={props.state.timeout}
          articleTimeout={props.state.articleTimeout}
          article={props.state.article}
          onCloseArticle={props.handleCloseArticle}
          allPosts={props.allPosts}
          preview={props.preview}
          youtubeVideos={props.youtubeVideos}
        />
        <Footer timeout={props.state.timeout} />
      </div>

      <div id="bg" />
    </div>
  </div>
)

Base.propTypes = {
  state: PropTypes.object,
  handleCloseArticle: PropTypes.func,
  allPosts: PropTypes.array,
  preview: PropTypes.bool,
  youtubeVideos: PropTypes.object,
}

export default Base
