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
                <li><Link href="/intro"><a><strong>Intro</strong></a></Link></li>
                <li><Link href="/photos"><a><strong>Photos</strong></a></Link></li>
                <li><Link href="/videos"><a><strong>&nbsp;&nbsp;Videos&nbsp;&nbsp;</strong></a></Link></li>
                <li><Link href="/podcasts"><a><strong>Podcasts</strong></a></Link></li>
                <li><Link href="/blog"><a><strong>Blog</strong></a></Link></li>
                <li><Link href="/contact"><a><strong>Contact</strong></a></Link></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool,
}

export default Header