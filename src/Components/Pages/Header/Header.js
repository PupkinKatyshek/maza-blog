import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import BtnSignInUp from '../../BtnSignInUp'
import UserLoginIcon from '../../UserLoginIcon'
import { changedMark } from '../../../Redux/apiSlicer'
import { login } from '../../../Redux/userSlicer'

import classes from './Header.module.scss'

function Header() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const isLogin = useSelector((state) => state.userSlicer.isLogin)

  useEffect(() => {
    if (token) {
      dispatch(login(true))
    }
  }, [])

  return (
    <div className={classes.header}>
      <Link to="/">
        <button
          className={classes.back}
          onClick={() => {
            dispatch(changedMark())
          }}
        >
          <span className={classes.title}>Realworld Blog</span>
        </button>
      </Link>
      <div className={classes.btn}>{isLogin ? <UserLoginIcon /> : <BtnSignInUp />}</div>
    </div>
  )
}

export default Header
