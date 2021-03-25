import Blog from "../components/Blog"
import Contact from "../components/Contact"
import Intro from "../components/Intro"
import Gallery from "../components/Gallery"
import PropTypes from 'prop-types';
import React from "react"

class Main extends React.Component {

  constructor(props){
    super(props);
    // bindings
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  
  handleKeyDown(event) {
    const ESC_KEY = 27;
    const key = parseInt(event.keyCode || event.which || 0, 10);
    if (key===ESC_KEY){
      this.props.onCloseArticle();
    }
  }

  render() {

    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>

    return (
      <div id="main" style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>
        <article id="intro" className={`${this.props.article === 'intro' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <Intro onCloseArticle={this.props.onCloseArticle} />
        </article>
        <article id="gallery" className={`${this.props.article === 'gallery' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <Gallery onCloseArticle={this.props.onCloseArticle} />
        </article>
        <article id="blog" className={`${this.props.article === 'blog' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <Blog onCloseArticle={this.props.onCloseArticle} />
        </article>
        <article id="contact" className={`${this.props.article === 'contact' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <Contact onCloseArticle={this.props.onCloseArticle} />
        </article>
      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool
}

export default Main