import PropTypes from 'prop-types';

const Footer = (props) => (
    <footer id="footer" style={props.timeout ? {display: 'none'} : {}}>
        <p className="copyright"> Copyright &copy; {new Date().getFullYear()} <a href="https://www.gokulmenon.com">www.gokulmenon.com</a> | Design: <a href="https://html5up.net">HTML5 UP</a> | Built with: <a href="https://nextjs.org">Next.js</a> | <a href="https://github.com/gokulmenon/homepage/blob/master/LICENSE">MIT License</a></p>
    </footer>
)

Footer.propTypes = {
    timeout: PropTypes.bool
}

export default Footer