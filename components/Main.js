import Blog from "../components/Blog"
import Contact from "../components/Contact"
import Intro from "../components/Intro"
import Photos from "../components/Photos"
import Videos from "../components/Videos"
import Podcasts from "../components/Podcasts"
import PropTypes from 'prop-types';
import React from "react"

class Main extends React.Component {

  constructor(props) {
    super(props);
    // bindings
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (this.props.article == "" || this.props.article == "blog") return;
    const ESC_KEY = 27;
    const key = parseInt(event.keyCode || event.which || 0, 10);
    if (key === ESC_KEY) {
      this.props.onCloseArticle();
    }
  }
  render() {

    let close = <div className="close" onClick={() => { this.props.onCloseArticle() }}></div>
    let article_component = null;
    switch (this.props.article) {
      case "intro":
        article_component = <article id="intro" className={`${this.props.article === 'intro' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <Intro onCloseArticle={this.props.onCloseArticle} />
        </article>;
        break;
      case "photos":
        article_component = <article id="photos" className={`${this.props.article === 'photos' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <Photos onCloseArticle={this.props.onCloseArticle}/>
        </article>;
        break;
      case "videos":
          article_component = <article id="videos" className={`${this.props.article === 'videos' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
            <Videos onCloseArticle={this.props.onCloseArticle} youtubeVideos={this.props.youtubeVideos}/>
          </article>;
          break;
      case "podcasts":
        article_component = <article id="podcasts" className={`${this.props.article === 'podcasts' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <Podcasts onCloseArticle={this.props.onCloseArticle} />
        </article>;
        break;
      case "blog":
        article_component = <article id="blog" className={`${this.props.article === 'blog' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <Blog
            onCloseArticle={this.props.onCloseArticle}
            allPosts={this.props.allPosts}
            preview={this.props.preview}
          />
        </article>;
        break;
      case "contact":
        article_component = <article id="contact" className={`${this.props.article === 'contact' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <Contact onCloseArticle={this.props.onCloseArticle} />
        </article>;
        break;
    }
    return (
      <div id="main" style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}>
        {article_component}
      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  youtubeVideos: PropTypes.object,
}

export default Main