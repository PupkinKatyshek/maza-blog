import React from 'react'

import Spiner from '../Pages/Spiner'

import classes from './LoadingList.module.scss'

function LoadingList() {
  return (
    <React.Fragment>
      <div className={classes.article}>
        <Spiner />
      </div>
      <div className={classes.article}>
        <Spiner />
      </div>
      <div className={classes.article}>
        <Spiner />
      </div>
      <div className={classes.article}>
        <Spiner />
      </div>
      <div className={classes.article}>
        <Spiner />
      </div>
    </React.Fragment>
  )
}

export default LoadingList
