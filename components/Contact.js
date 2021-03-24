
import PropTypes from 'prop-types';
import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faInstagram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

class Contact extends React.Component {

  render(){      
    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>;
      return (
        <div>
          <h2 className="major">Contact</h2>
            <img src="/static/images/work-in-progress.png" alt="" width='150px'/>
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
        </div>
    );
  }
}

  
Contact.propTypes = {
    onCloseArticle: PropTypes.func
  }
  
export default Contact