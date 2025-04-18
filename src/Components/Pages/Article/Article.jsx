import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { ApiArticles } from '../../../Api/Api.js'
import { loading, getCurrentPage } from '../../../Redux/apiSlicer'
import LoadingArticle from '../../LoadingArticle'
import Spiner from '../Spiner'

function Article() {
  const dispatch = useDispatch()
  const apiArticles = new ApiArticles()
  const id = useParams()
  let element = useSelector((state) => state.apiSlicer.currentPage)

  useEffect(() => {
    dispatch(loading(true))
    apiArticles
      .getCurrentArticle(id)
      .then((e) => {
        dispatch(getCurrentPage(e.article))
        dispatch(loading(false))
      })
      .catch((e) => {
        console.log(e)
      })
    dispatch(loading(false))
  }, [])

  return element ? <LoadingArticle element={element} /> : <Spiner />
}

export default Article
