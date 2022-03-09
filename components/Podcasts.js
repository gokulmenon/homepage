import React from "react"
import PropTypes from 'prop-types';

class Podcasts extends React.Component {

  render(){      
    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>;
      return (
        <div
            ><h2 className="major">Podcasts</h2>
            <span className="image main"><img src="/static/images/podcasts_coming_soon.jpg" alt="" /></span>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;
               I wanted start my podcasts series with some of the work my team and I are doing &nbsp;
                <a href="https://techcrunch.com/2021/12/09/meta-rolls-out-a-suite-of-new-features-and-discovery-tools-for-facebook-live-creators/">here </a>
                with an episode of hackerrank radio podcasts series <a href="https://open.spotify.com/playlist/6IxmDVVYOP0mxz0P6dTBxS">here </a>.
                I Have embedded the spotify radio stream below <br />
            </p>
            <iframe style={{ borderRadius :"12px"
              }} src="https://open.spotify.com/embed/episode/3QUqS2LbC0vsxuhKxmOY5M?utm_source=generator" width="100%" height="232" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            
            {close}
        </div>
    );
  }
}

  
Podcasts.propTypes = {
    onCloseArticle: PropTypes.func
  }
  
export default Podcasts