
import PropTypes from 'prop-types';
import React from "react"

class Blog extends React.Component {

  render(){      
    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>;
      return (
        <div>
            <h2 className="major">Blog</h2>
            <span className="image main"><img src="/static/images/coming_soon.jpg" alt="" /></span>
            <p>A big reason for the rewrite of this site was to build my own blog using a headless cms. 
                This is still work in progress soon below blogger iframe blog will be replaced by
                my own version built using sanity.io headless cms.</p>
            <iframe src='https://blogger.gokulmenon.com/'
                marginwidth='0' marginheight='0' frameborder='no' scrolling='yes'
                style={{border: 0, background: '#FFF', width: '100%', height: '1920px'}}>  </iframe>
                {/*  style='border-width:0px; border-color:#333; background:#FFF; border-style:solid;'> */}
                <script>iFrameResize();</script>
          {close}
        </div>
    );
  }
}

  
Blog.propTypes = {
    onCloseArticle: PropTypes.func
  }
  
export default Blog