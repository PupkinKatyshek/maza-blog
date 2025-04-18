import React from 'react'

import classes from './Spiner.module.scss'

function Spiner() {
  return (
    <div className={classes['lds-roller']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spiner
