import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ApiArticles } from '../../Api/Api.js'
import { changedMark } from '../../Redux/apiSlicer'

import classes from './PopUp.module.scss'
import pic from './Frame.png'

function PopUp({ popActive, setPopActive }) {
  const navigate = useNavigate()

  const apiArticles = new ApiArticles()
  const dispatch = useDispatch()
  const element = useSelector((state) => state.apiSlicer.currentPage)

  const goHome = () => {
    navigate('/', { replace: true })
  }

  function delArc() {
    apiArticles
      .deleteArgticle(element.slug)
      .then(() => {
        goHome()
        dispatch(changedMark())
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div
      className={popActive ? `${classes.block} ${classes.active}` : classes.block}
      onClick={() => {
        setPopActive(false)
      }}
    >
      <div
        className={classes.up}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={classes.text}>
          <img className={classes.pic} src={pic} />
          <span>Are you sure to delete this article?</span>
        </div>
        <div className={classes.btnblock}>
          <button
            className={classes.no}
            onClick={() => {
              setPopActive(false)
            }}
          >
            No
          </button>
          <button
            className={classes.yes}
            onClick={() => {
              delArc()
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopUp
