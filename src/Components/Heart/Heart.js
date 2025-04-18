import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { ApiArticles } from '../../Api/Api.js'
import { changedMark } from '../../Redux/apiSlicer'

import classes from './Heart.module.scss'
import heart from './heart1.png'
import heartRed from './heart_red.png'

function Heart({ element }) {
  const apiArticles = new ApiArticles()
  const dispatch = useDispatch()
  const id = useLocation()
  let [isFavorite, setIsFavorite] = useState(element.favorited)
  let [count, setCount] = useState(element.favoritesCount)
  const isLogin = useSelector((state) => state.userSlicer.isLogin)

  const mark = () => {
    let type = isFavorite ? 'DELETE' : 'POST'
    let newCount = isFavorite ? count - 1 : count + 1
    setIsFavorite(!isFavorite)
    setCount(newCount)
    apiArticles
      .markAsFavoriteArgticle(element.slug, type)
      .then(() => {
        if (id.pathname != '/') {
          dispatch(changedMark())
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className={classes.block}>
      <button
        className={isLogin ? `${classes.likebtn} ${classes.pointer}` : classes.likebtn}
        onClick={() => {
          if (isLogin) {
            mark()
          }
        }}
      >
        {isFavorite ? (
          <img src={heartRed} className={classes.heart} alt="like" />
        ) : (
          <img src={heart} className={classes.heart} alt="like" />
        )}
      </button>
      <div className={classes.counter}>{count}</div>
    </div>
  )
}

export default Heart
