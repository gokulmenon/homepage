import PropTypes from 'prop-types';

const Footer = (props) => (
    <footer id="footer" style={props.timeout ? {display: 'none'} : {}}>
        <p className="copyright"> Copyright &copy; <a href="www.gokulmenon.com">www.gokulmenon.com</a> | Design: <a href="https://html5up.net">HTML5 UP</a> | Built with: <a href="https://github.com/zeit/next.js">Next.js</a></p>
    </footer>
)

Footer.propTypes = {
    timeout: PropTypes.bool
}

export default Footer