import PropTypes from 'prop-types';
import React from "react"

import Youtube from '../components/gallery/Youtube'

class Videos extends React.Component {

  render() {
    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>;
    return (
    <div>
      <h2 className="major">Videos</h2>   
      <h3> Youtube Videos </h3>     
      <Youtube videos={this.props.youtubeVideos}/>
      <br />  
      
      {close}
    </div>
    );
  }
}
  
Videos.propTypes = {
  onCloseArticle: PropTypes.func,
  youtubeVideos: PropTypes.object,
}

export default Videos