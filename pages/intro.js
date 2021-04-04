import React from "react"
import Base from "../components/Base"
import { withRouter  } from 'next/router'

class IntroPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isArticleVisible: false,
            timeout: false,
            articleTimeout: false,
            article: "intro",
            loading: ""
        }
        this.router = props.router;
        this.handleOpenArticle = this.handleOpenArticle.bind(this)
        this.handleCloseArticle = this.handleCloseArticle.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.handleOpenArticle('intro');
        }, 100)
    }

    handleOpenArticle(article) {
        this.setState({
            isArticleVisible: !this.state.isArticleVisible,
            article
        })

        setTimeout(() => {
            this.setState({
                timeout: !this.state.timeout
            })
        }, 325)

        setTimeout(() => {
            this.setState({
                articleTimeout: !this.state.articleTimeout
            })
        }, 350)
    }

    handleCloseArticle() {
      this.router.push("/");
    }
    
    render() {
        return (
            <Base 
              state={this.state}
              handleCloseArticle={this.handleCloseArticle}
              handleOpenArticle={this.handleOpenArticle}
              />
        )
    }
}

export default withRouter(IntroPage)
