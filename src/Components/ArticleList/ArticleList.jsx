import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import ArticleSmall from '../Pages/ArticleSmall'
import LoadingList from '../LoadingList'
import { getCurrentPage } from '../../Redux/apiSlicer'

import classes from './ArticleList.module.scss'

function ArticleList() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentPage(''))
  })

  const articles = useSelector((state) => state.apiSlicer.articles)
  const isLoading = useSelector((state) => state.apiSlicer.isLoading)
  const element = articles.map((el) => <ArticleSmall el={el} key={uuidv4()} />)

  return isLoading ? <LoadingList /> : <div className={classes.list}> {element}</div>
}

export default ArticleList
