import React from 'react'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'

import UserIcon from '../UserIcon'
import Heart from '../Heart'
import BtnEditArt from '../BtnEditArt'
import Tag from '../Tag'

import classes from './LoadingArticle.module.scss'

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

function LoadingArticle({ element }) {
  let limitTitle
  let limitBody
  if (element.title.split(' ').length - 1 == 0) {
    limitTitle = 50
  } else {
    limitTitle = 250
  }
  if (element.body.split(' ').length - 1 == 0) {
    limitBody = 100
  } else {
    limitBody = 250000
  }

  const user = useSelector((state) => state.userSlicer.user)
  const isLogin = useSelector((state) => state.userSlicer.isLogin)
  return (
    <section className={classes.list}>
      <div className={classes.header}>
        <div className={classes.title}>
          <span>{kitcut(element.title, limitTitle)}</span>
          <Heart element={element} />
        </div>
        <UserIcon el={element} />
      </div>
      <Tag el={element} />
      <div className={classes.discriptionblock}>
        <span className={classes.disc}>{kitcut(element.description, limitTitle)}</span>
        {isLogin && element.author.username == user.username ? <BtnEditArt elem={element} /> : null}
      </div>
      <div>
        <ReactMarkdown>{kitcut(element.body, limitBody)}</ReactMarkdown>
      </div>
    </section>
  )
}

export default LoadingArticle
