import React from "react"
import PropTypes from 'prop-types';

// Years of experience, floored, from a May 2010 start — auto-increments each May.
function yearsOfExperience() {
  const now = new Date()
  let years = now.getFullYear() - 2010
  if (now.getMonth() < 4) years -= 1 // months are 0-indexed; May = 4
  return years
}

class Intro extends React.Component {

  render(){      
      return (
        <div
            ><h2 className="major">Intro</h2>
            <span className="image main"><img src="/static/images/gokul_menon_intro_photo.jpg" alt="" /></span>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;
                My name is Gokul Menon and I work as a Software Engineer
                at  <strike>Facebook</strike> Meta in the New York office. I have over {yearsOfExperience()} years of software development and engineering experience
                building enterprise software. You can read about some of the work my team and I have done &nbsp;
                <a href="https://techcrunch.com/2021/12/09/meta-rolls-out-a-suite-of-new-features-and-discovery-tools-for-facebook-live-creators/">here </a>
                and an episode of hackerrank radio podcasts series <a href="https://open.spotify.com/playlist/6IxmDVVYOP0mxz0P6dTBxS">here </a>.
                I am a full stack developer mostly focussed on backend.
                I spent several years in the video org working across the full stack on Reels and live video;
                I now work in the applied AI org on the AI Model Foundations team.
                Before <strike>Facebook</strike> Meta I worked ~9 years in fintech (Bank Of America & Deutsche Bank) 
                building electronic trading systems, marketdata/reference data plumbing enabling human and
                algorithmic trading applications. <br /><br />

                &nbsp;&nbsp;&nbsp;&nbsp;On the personal front, I live in New Jersey with my wife Akhila and our two young boys.
                Most of my free time goes to them, the house, and a lawn that refuses to stay green on its own.
                <br /><br />

                &nbsp;&nbsp;&nbsp;&nbsp;I am passionate about all things Computer Science , Football, 
                Astronomy &amp; Astrophotography. I also love to paint acrylic over canvas panels,
                play video games, travel, love to read both fiction and non fiction books
                and lastly I am life long Manchester United Fan.
                They say you can change your city, your country, change your religion but 
                you never change your football club.
                <br /><br />

                &nbsp;&nbsp;&nbsp;&nbsp;This website is a pet project and 
                I use it as a scratch pad to learn cool web technologies,
                hack and glue together arbitrary pieces of code.
                It is still mostly static at heart: Next.js and React,
                now deployed on Vercel (migrated off Google App Engine),
                with the blog running on Supabase (migrated off Sanity.io).
                It uses a template designed by&nbsp; 
                <a href="https://html5up.net">HTML5 UP</a> and released for free under the&nbsp;
                <a href="https://html5up.net/license"> Creative Commons</a> license.<br /><br />
                &nbsp;&nbsp;&nbsp;&nbsp;This version is a full rewrite from an <a href="https://deprecated.gokulmenon.com"> old version </a> 
                 which was using the web.py python web framework and jinja2 templating engine also running on 
                 google app engine using the python standard environment. The source code is on <a href="https://github.com/gokulmenon/homepage">GitHub</a> 
                 as a template for anyone else to use for their own personal website.
            </p>
            
        </div>
    );
  }
}

  
Intro.propTypes = {
    onCloseArticle: PropTypes.func
  }
  
export default Intro