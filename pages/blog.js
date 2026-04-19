import React from "react"
import Base from "../components/Base"
import { getAllPostsForHome } from '../lib/api'
import { useReducer } from 'react';
import { useRouter  } from 'next/router'

const initialState = {
  isArticleVisible: false,
  timeout: false,
  articleTimeout: false,
  article: "blog",
  loading: ""
}

function reducer(state, action) {
  switch (action.type) {
    case 'isArticleVisible':
      return { ...state, isArticleVisible: action.value };
    case 'timeout':
      return { ...state, timeout: action.value };
    case 'articleTimeout':
      return { ...state, articleTimeout: action.value };
    case 'article':
      return { ...state, article: action.value };
    case 'loading':
      return { ...state, loading: action.value };
    default:
      throw new Error();
  }
}

export default function BlogPage(props) {
  const [pageState, dispatch] = useReducer(reducer, initialState);
  const { isArticleVisible, timeout, articleTimeout, article, loadding } = pageState;
  const handleCloseArticle = () => {
    useRouter().push('/')
  }
  const handleOpenArticle = (article) => {
    dispatch({ type: 'isArticleVisible', value: true });
    dispatch({ type: "article", value: article });
    setTimeout(() => {
      dispatch({ type: 'timeout', value: true });
    }, 325)

    setTimeout(() => {
      dispatch({ type: 'articleTimeout', value: true });
    }, 350)
  }

  setTimeout(() => {
    handleOpenArticle('blog');
  }, 100)

  return (
    <Base
      state={pageState}
      handleCloseArticle={handleCloseArticle}
      allPosts={props.allPosts}
      preview={props.preview}
    />
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { allPosts, preview },
    revalidate: 3600
  }
}
