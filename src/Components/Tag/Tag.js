import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import classes from './Tag.module.scss'

function kitcut(text, limit) {
  text = text.trim()
  if (text.length <= limit) return text
  text = text.slice(0, limit)
  let lastSpace = text.lastIndexOf(' ')
  if (lastSpace > 0) {
    text = text.substr(0, lastSpace)
  }
  return text + '...'
}

function Tag({ el }) {
  if (!el) {
    return
  }
  const tag = el.tagList.map((e) => {
    if (!e) {
      return
    } else if (e.trim().length == 0) {
      return
    }

    e = kitcut(e, 30)

    return (
      <span className={classes.tag} key={uuidv4()}>
        {e}
      </span>
    )
  })
  return (
    <div className={classes.taglist}>
      {el.tagList.join().trim().length > 0 ? tag : <span className={classes.tag}>No tags</span>}
    </div>
  )
}

export default Tag
