import PropTypes from 'prop-types';
import React from "react"
import Gallery from "../components/Gallery"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

class Main extends React.Component {
  render() {

    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>

    return (
      <div id="main" style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>

        <article id="intro" className={`${this.props.article === 'intro' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Intro</h2>
          <span className="image main"><img src="/static/images/gokul_menon_intro_photo.jpg" alt="" /></span>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;
              My name is Gokul Menon and I work as a Software Engineer
              at Facebook in New York and have over 10 years of software development and engineering experience building enterprise
              software. I am a full stack developer mostly focussed on backend. Before Facebook I worked in fintech building things like electronic trading systems and algorithmic trading platforms. <br /><br />
              &nbsp;&nbsp;&nbsp;&nbsp;I am passionate about all things Computer Science , Football ,astronomy &amp; astrophotography.
              I also love to paint acrylic over canvas panels, play video games and travel and read
              and lastly I am ardent Manchester United Fan.
              They say you can change your city, your country, change your religion but you never change your football club.
              <br /><br />
              &nbsp;&nbsp;&nbsp;&nbsp;This website is a pet project and I plan to use it as a scratch pad to learn
              cool web technologies,hack and glue together
              arbitrary pieces of code to make a simple static homepage. I plan to keep this website purely static
              and keep it simple. It is running on google app engine platform with a 
              standard node js environment, running on nextJs and react. It uses the Dimension site template,
              designed by  <a href="https://html5up.net">HTML5 UP</a>.
              This version is a full rewrite from the old version which was using the web.py pyton web framework.
              
          </p>
          {close}
        </article>

        <article id="blog" className={`${this.props.article === 'blog' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
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
        </article>

        <article id="gallery" className={`${this.props.article === 'gallery' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Gallery</h2>          
          <Gallery />
          <br />
          {/* <span className="image main"><img src="/static/images/pic02.jpg" alt="" /></span> */}
          <p> &nbsp;&nbsp;&nbsp;&nbsp; I have always been interested in photography 
            from the time I could get my hands on a
            camera. Starting from a camera with a limited physical reel to digital 
            cameras to mobile cameras.The best camera is the one you have they say, 
            its very true. <br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp; This page hosts a collection of my photos starting with
            some curated photographs above showcasing my best astrophotography exploits, 
            followed with some of my most recent Instagram feed photos below.
            Please consider copyright and request permission before any usage.
          </p>
          <p> &nbsp;&nbsp;&nbsp;&nbsp; I have taken a keen interest in astrophotography and amateur astronomy in general.
            I have travelled to several dark sky parks and enjoyed the cosmic display of the stars.
            Stargazing became an ever expanding hobby
            Humbled by my new found knowledge and excited to dig deeper into the field and explore the world of
            astronomy.<br />
              <br />&nbsp;&nbsp;&nbsp;&nbsp;  Cities these days block out most but the brightest stars and planets,
            so we have to make more effort these days to go see the night sky like our ancestors
            were easily able to before artificial light pollution
            was even a thing, often driving hours away from cities in search of dark skies.Most people I know
            have never seen the Milkyway our home galaxy with their naked eyes.
            <br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp; Chasing the milkyway every remote travel destination I visit now has become a routine
            and I am still amazed by the beauty of the night sky.
            
            'If you look up at the Milky Way through the eyes of Carl Sagan, you get a feeling in your chest of something greater than yourself. And it is. But it\'s not supernatural.' - Richard Dawkins.
          </p> 
          <h3 className="minor">Instagram Feed</h3>
          <script src='https://embedsocial.com/js/iframe.js'></script>
           <iframe 
              style={{border: 0, width: '100%', height: '100%'}} 
              scrolling='no' 
              src='https://embedsocial.com/facebook_album/pro_instagram/9964b269b53d447ae1fbd625d714012921152253'>
            </iframe>
          <script>iFrameResize();</script>
          {close}
        </article>

        <article id="contact" className={`${this.props.article === 'contact' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Contact</h2>
          {/* <span className="image main"> */}
            <img src="/static/images/work-in-progress.png" alt="" width='150px'/>
            {/* </span> */}
          <p> This form doesn't work yet as the backend is not yet implemented.</p>
          <form method="post" action="#">
            <div className="field half first">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="4"></textarea>
            </div>
            <ul className="actions">
              <li><input type="submit" value="Send Message" className="special" /></li>
              <li><input type="reset" value="Reset" /></li>
            </ul>
          </form>
          <ul className="icons">
            <li><a href="https://www.linkedin.com/in/gokulmenon/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a></li>
            <li><a href="https://www.facebook.com/gokulmenon/">
              <FontAwesomeIcon icon={faFacebook} />
            </a></li>
            <li><a href="https://www.instagram.com/gokulsmenon/">
              <FontAwesomeIcon icon={faInstagram} />
            </a></li>
            <li><a href="https://github.com/gokulmenon">
              <FontAwesomeIcon icon={faGithub} />
            </a></li>
          </ul>
          {close}
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