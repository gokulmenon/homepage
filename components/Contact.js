
import emailjs from 'emailjs-com';
import PropTypes from 'prop-types';
// import React from "react"
import ReCAPTCHA from "react-google-recaptcha";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { init } from 'emailjs-com';
import { useState, useReducer } from 'react';

const initialState = {
    name: '',
    email: '',
    message: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.value };
        case 'email':
            return { ...state, email: action.value };
        case 'message':
            return { ...state, message: action.value };
        default:
            throw new Error();
    }
}

function Contact(props) {
    let close = <div className="close" onClick={() => { props.onCloseArticle(); resetForm() }}></div>;
    let social_icons =
        <div>
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
        </div>;
    const [formState, dispatch] = useReducer(reducer, initialState);
    const [showFormErr, setShowFormErr] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState({ title: 'Send me a message', paragraph: '' });
    const [showCaptcha, setShowCaptcha] = useState(false);
    const { name, email, message } = formState;

    const submitFormAndShowCaptcha = (e) => {
        e.preventDefault();
        setShowCaptcha(true);
    };

    const resetForm = (event) => {
        dispatch({ type: 'name', value: "" });
        dispatch({ type: 'email', value: "" });
        dispatch({ type: 'message', value: "" });
        setFormSubmitted({ title: 'Send me a message', paragraph: '' });
        setShowCaptcha(false);
        setShowFormErr(false);
    }

    const sendEmail = (captchaValue) => {
        if (name === '' || email === '' || message === '') {
            setShowFormErr(true);
            return;
        }

        const params = {
            ...formState,
            'g-recaptcha-response': captchaValue,
        };

        setFormSubmitted({ title: 'Sending message...', paragraph: '' });
         //TODO use process.env instead of hardcoding below
        let user_id = 'user_oA6PTE3FlD8eJswfCFb3l'; 
        init(user_id);
        emailjs.send("service_ofg13kp", "template_dr4p8c8", params)
            .then(({ status }) => {
                if (status === 200) {
                    setFormSubmitted({ title: 'Message has been sent', paragraph: 'Gokul will be in contact with you soon.' });
                } else {
                    setFormSubmitted({ title: 'Unexpected status code returned from EmailJS, try again later', paragraph: 'Please contact Gokul on either of the below social channels.' });
                }
            }, (err) => {
                // eslint-disable-next-line no-console
                console.log(err);
                setFormSubmitted({ title: 'Error sending message, try again later', paragraph: 'Please contact Gokul on either of the social channels.' });
            });
    };

    return formSubmitted.title === 'Send me a message' ? (
        <div>
            <h2 className="major">Contact</h2>
            <h4>{formSubmitted.title}</h4>
            {!showCaptcha ? (
                <form onSubmit={submitFormAndShowCaptcha}>
                    <div className="field half first">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={name}
                            onChange={(e) => dispatch({ type: 'name', value: e.target.value })}
                            required />
                    </div>
                    <div className="field half">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email}
                            onChange={(e) => dispatch({ type: 'email', value: e.target.value })}
                            required />
                    </div>
                    <div className="field">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" rows="4" value={message}
                            onChange={(e) => dispatch({ type: 'message', value: e.target.value })}
                            required></textarea>
                    </div>
                    <ul className="actions">
                        <li><input type="submit" value="Send Message" className="special" /></li>
                        <li><input type="reset" value="Reset" onClick={resetForm}/>
                        </li>
                    </ul>
                </form>
            ) : (
                <ReCAPTCHA
                    //TODO use process.env instead of hardcoding below
                    sitekey="6LcAEI8aAAAAANPNCrQiyM4rXiuJnIB3RiB9LuMi"
                    onChange={sendEmail}
                />
            )
            }{social_icons} </div>
    ) : (
        <div>
            <h2 className="major">Contact</h2>
            <h4>{formSubmitted.title}</h4>
            <p>{formSubmitted.paragraph}</p>
            {social_icons}
        </div>
    );
}


Contact.propTypes = {
    onCloseArticle: PropTypes.func
}

export default Contact