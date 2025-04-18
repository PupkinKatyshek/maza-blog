import React from 'react'
import { Link } from 'react-router-dom'

import Heart from '../../Heart'
import UserIcon from '../../UserIcon'
import Tag from '../../Tag'

import classes from './ArticleSmall.module.scss'

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

function ArticleSmall({ el }) {
  let limit
  if (el.body.split(' ').length - 1 == 0) {
    limit = 110
  } else {
    limit = 220
  }

  return (
    <div className={classes.article}>
      <div className={classes.title}>
        <Link to={`/${el.slug}`}>{kitcut(el.title, 50)}</Link>
        <Heart element={el} />
      </div>
      <UserIcon el={el} />
      <Tag el={el} />
      <div className={classes.text}>{kitcut(el.description, limit)}</div>
    </div>
  )
}
export default ArticleSmall
