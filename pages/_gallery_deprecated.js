import React from "react"
import Base from "../components/Base"
import { withRouter  } from 'next/router'
import { getChannelInfo, getAllPlaylistItems } from "../lib/youtube";

class GalleryPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isArticleVisible: false,
            timeout: false,
            articleTimeout: false,
            article: "gallery",
            loading: ""
        }
        this.router = props.router;
        this.handleOpenArticle = this.handleOpenArticle.bind(this)
        this.handleCloseArticle = this.handleCloseArticle.bind(this)
        this.youtubeVideos = props.youtubeVideos;
    }

    componentDidMount() {
        setTimeout(() => {
            this.handleOpenArticle('gallery');
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
              youtubeVideos={this.youtubeVideos}
              />
        )
    }
}

export default withRouter(GalleryPage)



export async function getServerSideProps({ }) {
  const youtubeVideos = await getAllPlaylistItems();
  // console.log(typeof youtubeVideos);
  return {
    props: {
      youtubeVideos,
    },
  };
}
