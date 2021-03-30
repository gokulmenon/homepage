import React from "react"
import PropTypes from 'prop-types';

class Intro extends React.Component {

  render(){      
    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>;
      return (
        <div
            ><h2 className="major">Intro</h2>
            <span className="image main"><img src="/static/images/gokul_menon_intro_photo.jpg" alt="" /></span>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;
                My name is Gokul Menon and I work as a Software Engineer
                at Facebook in New York and have over 10 years of software development and engineering experience
                building enterprise software. I am a full stack developer mostly focussed on backend. 
                Before Facebook I worked in fintech building things like electronic trading systems and 
                algorithmic trading platforms. <br /><br />

                &nbsp;&nbsp;&nbsp;&nbsp;I am passionate about all things Computer Science , Football, 
                Astronomy &amp; Astrophotography. I also love to paint acrylic over canvas panels,
                play video games, travel, love to read both fiction and non fiction books
                and lastly I am ardent Manchester United Fan.
                They say you can change your city, your country, change your religion but 
                you never change your football club.
                <br /><br />

                &nbsp;&nbsp;&nbsp;&nbsp;This website is a pet project and 
                I plan to use it as a scratch pad to learn cool web technologies,
                hack and glue together arbitrary pieces of code to make a simple static homepage. 
                I plan to keep this website purely static
                and keep it simple. It is running on google app engine platform with a 
                standard node js environment, running on nextJs and react. It uses a template designed by 
                <a href="https://html5up.net">HTML5 UP</a> and released for free under the 
                <a href="https://html5up.net/license">Creative Commons</a> license.
                This version is a full rewrite from an <a href="https://deprecated.gokulmenon.com">  old version</a> 
                which was using the web.py pyton web framework and jinja2 templating engine.
            </p>
            {close}
        </div>
    );
  }
}

  
Intro.propTypes = {
    onCloseArticle: PropTypes.func
  }
  
export default Intro