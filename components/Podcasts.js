import React from "react"
import PropTypes from 'prop-types';

class Podcasts extends React.Component {

  render(){      
    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>;
      return (
        <div
            ><h2 className="major">Podcasts</h2>
            <span className="image main"><img src="/static/images/podcasts_header.jpg" alt="" /></span>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;
               I wanted start my podcasts series with an episode of 
               <a href="https://open.spotify.com/playlist/6IxmDVVYOP0mxz0P6dTBxS"> hackerrank radio </a> podcasts series
               where I talk about how facebook live video backend works.
               <br />
            </p>
            <iframe 
              style={{ borderRadius :"12px"}}
              src="https://open.spotify.com/embed/episode/3QUqS2LbC0vsxuhKxmOY5M?utm_source=generator&theme=0"
              width="100%"
              height="232"
              frameBorder="0"
              allowfullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
            </iframe>

            <br />
            <p>
            Next are podcasts from my series titled <a href="https://open.spotify.com/show/1WC3iJoZslGYic6itLvWqx">'The Final Score'</a>
            <br />
            Episode 1:  Discussion & Spoiler cast on the book "The Three Body Problem" by Liu Cixin
            </p>
            <iframe 
              style={{ borderRadius :"12px"}}
              src="https://open.spotify.com/embed/episode/4d8KUCZQPGKunbbhIPa6V3?utm_source=generator&theme=0"
              width="100%"
              height="232"
              frameBorder="0"
              allowfullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
            </iframe>
            {close}
        </div>
    );
  }
}

  
Podcasts.propTypes = {
    onCloseArticle: PropTypes.func
  }
  
export default Podcasts