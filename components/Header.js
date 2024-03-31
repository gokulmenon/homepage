import Link from 'next/link'
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
                <li><Link href="/intro"><strong>Intro</strong></Link></li>
                <li><Link href="/photos"><strong>Photos</strong></Link></li>
                <li><Link href="/videos"><strong>&nbsp;&nbsp;Videos&nbsp;&nbsp;</strong></Link></li>
                <li><Link href="/podcasts"><strong>Podcasts</strong></Link></li>
                <li><Link href="/blog"><strong>Blog</strong></Link></li>
                <li><Link href="/contact"><strong>Contact</strong></Link></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool,
}

export default Header