import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import PopUp from '../PopUp'

import classes from './BtnEditArt.module.scss'

function BtnEditArt({ elem }) {
  const [popActive, setPopActive] = useState(false)
  return (
    <div className={classes.block}>
      <button
        className={classes.delete}
        onClick={() => {
          setPopActive(true)
        }}
      >
        <span>Delete</span>
      </button>

      <PopUp popActive={popActive} setPopActive={setPopActive} />
      <Link to={`/articles/${elem.slug}/edit`}>
        <button className={classes.edit}>
          <span>Edit</span>
        </button>
      </Link>
    </div>
  )
}

export default BtnEditArt
