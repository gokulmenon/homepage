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
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,600,600i" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
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
  preview: PropTypes.bool
}

export default Base
