import Link from 'next/link'
import PropTypes from 'prop-types';


const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        <div className="logo" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
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