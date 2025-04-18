import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Authentication } from '../../Api/Api.js'
import { changedMark } from '../../Redux/apiSlicer'
import { getUser, login } from '../../Redux/userSlicer'

import classes from './UserLoginIcon.module.scss'
import face from './face.png'

function UserLoginIcon() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userSlicer.user)

  const apiAuthentication = new Authentication()
  useEffect(() => {
    apiAuthentication.getuser().then((e) => {
      dispatch(getUser(e.user))
    })
  }, [])

  function signOut() {
    dispatch(login(false))
    dispatch(changedMark())
    localStorage.clear()
  }

  return (
    <div className={classes.block}>
      <Link to={'/new-article'}>
        <div className={classes.create}>Create article</div>
      </Link>
      <Link to={'/profile'}>
        <div className={classes.userblock}>
          <div className={classes.user}>{user ? user.username : 'User'}</div>
          <div className={classes.face}>
            {user.image ? (
              <img className={classes.faceimg} src={user.image} alt="user photo" />
            ) : (
              <img className={classes.faceimg} src={face} alt="user photo" />
            )}
          </div>
        </div>
      </Link>
      <Link to={'/'}>
        <button
          className={classes.in}
          onClick={() => {
            signOut()
          }}
        >
          <div>Sign Out</div>
        </button>
      </Link>
    </div>
  )
}

export default UserLoginIcon
