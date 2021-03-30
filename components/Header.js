import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'


const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        <div className="logo">
            <FontAwesomeIcon icon={faHome} />
        </div>
        <div className="content">
            <div className="inner">
                <h1>Gokul Menon</h1>
                <p>
                    Welcome to the little corner of the internet that I can call my home in cyberspace.<br />
                    This is yet another static website with blog built with free (as in free beer) open source software.
                </p>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="#" onClick={() => {props.onOpenArticle('intro')}}><strong>Intro</strong></a></li>
                <li><a href="#" onClick={() => {props.onOpenArticle('gallery')}}><strong>Gallery</strong></a></li>
                <li><a href="#" onClick={() => {props.onOpenArticle('blog')}}><strong>Blog</strong></a></li>
                <li><a href="#" onClick={() => {props.onOpenArticle('contact')}}><strong>Contact</strong></a></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool,
}

export default Header