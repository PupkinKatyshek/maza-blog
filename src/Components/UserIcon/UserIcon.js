import React from 'react'
import { format } from 'date-fns'

import classes from './UserIcon.module.scss'
import face from './face.png'

function UserIcon({ el }) {
  const date = el ? format(new Date(el.createdAt), 'LLLL d, yyyy') : 'no date'
  return (
    <div className={classes.block}>
      <div className={classes.user}>
        <span>{el ? el.author.username : 'User'}</span>
        <span className={classes.date}>{date}</span>
      </div>
      <div className={classes.face}>
        {el.author.image ? (
          <img className={classes.faceimg} src={el.author.image} alt="face img" />
        ) : (
          <img className={classes.faceimg} src={face} alt="face img" />
        )}
      </div>
    </div>
  )
}

export default UserIcon
