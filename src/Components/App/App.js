import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'
import { Routes, Route, useLocation } from 'react-router-dom'
import 'antd/dist/antd.css'

import { ApiArticles } from '../../Api/Api.js'
import { getarticles, loading, offset, getarticlescount } from '../../Redux/apiSlicer'
import ArticleList from '../ArticleList'
import Header from '../Pages/Header'
import Article from '../Pages/Article'
import CreateAccount from '../Pages/CreateAccount'
import SignIn from '../Pages/SignIn'
import Profile from '../Pages/Profile'
import CreateArticle from '../Pages/CreateArticle'

import classes from './App.module.scss'

function App() {
  const dispatch = useDispatch()
  const id = useLocation()
  const skipNumber = useSelector((state) => state.apiSlicer.skipNumber)
  const articlescount = useSelector((state) => state.apiSlicer.articlescount)
  const changedMark = useSelector((state) => state.apiSlicer.changedMark)

  const apiArticles = new ApiArticles()

  function getres(skipNumber) {
    dispatch(loading(true))
    apiArticles.getArticleList(skipNumber).then((a) => {
      dispatch(getarticles(a.articles))
      dispatch(getarticlescount(a.articlesCount))
      dispatch(loading(false))
    })
  }
  useEffect(() => {
    getres(skipNumber * 5)
  }, [changedMark])

  function pagiChange(e) {
    dispatch(offset(e - 1))
    getres((e - 1) * 5)
  }

  return (
    <div className={classes.app}>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/:id" element={<Article />} />
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/articles/:id/edit" element={<CreateArticle />} />
      </Routes>
      {id.pathname == '/' ? (
        <Pagination
          showSizeChanger={false}
          defaultCurrent={1}
          current={skipNumber + 1}
          size={'small'}
          total={articlescount}
          onChange={(e) => {
            pagiChange(e)
          }}
        />
      ) : null}
    </div>
  )
}

export default App
