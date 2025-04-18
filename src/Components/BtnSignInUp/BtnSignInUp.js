import React from 'react'
import { Link } from 'react-router-dom'

import classes from './BtnSignInUp.module.scss'

function BtnSignInUp() {
  return (
    <div className={classes.block}>
      <Link to={'/sign-in'}>
        <div className={classes.in}>Sign In</div>
      </Link>
      <Link to={'/sign-up'}>
        <div className={classes.up}>Sign Up</div>
      </Link>
    </div>
  )
}

export default BtnSignInUp
