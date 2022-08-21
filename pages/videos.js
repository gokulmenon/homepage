import React from "react"
import Base from "../components/Base"
import { withRouter  } from 'next/router'
import { getAllPlaylistItems } from "../lib/youtube"

class VideosPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isArticleVisible: false,
            timeout: false,
            articleTimeout: false,
            article: "videos",
            loading: ""
        };
        this.router = props.router;
        this.handleOpenArticle = this.handleOpenArticle.bind(this);
        this.handleCloseArticle = this.handleCloseArticle.bind(this);
        this.youtubeVideos = props.youtubeVideos;
    }

    componentDidMount() {
        setTimeout(() => {
            this.handleOpenArticle('videos');
        }, 100);
    }

    handleOpenArticle(article) {
        this.setState({
            isArticleVisible: !this.state.isArticleVisible,
            article
        });

        setTimeout(() => {
            this.setState({
                timeout: !this.state.timeout
            })
        }, 325);

        setTimeout(() => {
            this.setState({
                articleTimeout: !this.state.articleTimeout
            })
        }, 350);
    }

    handleCloseArticle() {
      this.router.push("/");
    }
    
    render() {
        return (
            <Base 
              state={this.state}
              handleCloseArticle={this.handleCloseArticle}
              youtubeVideos={this.youtubeVideos}
              />
        )
    }
}

export default withRouter(VideosPage)



export async function getServerSideProps({ }) {
  const youtubeVideos = await getAllPlaylistItems();
  return {
    props: {
      youtubeVideos,
    },
  };
}
