import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Authentication } from '../../../Api/Api.js'
import { getUser, login } from '../../../Redux/userSlicer'

import classes from './Profile.module.scss'

function Profile() {
  const isLogin = useSelector((state) => state.userSlicer.isLogin)
  const user = useSelector((state) => state.userSlicer.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorList, setErrorList] = useState(0)
  const gosign = () => {
    navigate('/sign-in', { replace: true })
  }

  useEffect(() => {
    if (!isLogin) {
      gosign()
    }
  })

  const apiAuthentication = new Authentication()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    let res = {}
    for (let key in data) {
      if (data[key].length > 0) {
        res[key] = data[key]
      }
    }

    apiAuthentication.updateProfile(res).then((e) => {
      if (e.errors) {
        setErrorList(e.errors)
      } else {
        dispatch(getUser(''))
        dispatch(login(false))
        gosign()
      }
    })
    reset()
  }
  return (
    <div className={classes.main}>
      <div className={classes.block}>
        <div className={classes.title}>Edit Profile</div>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={errors?.username || errorList?.username ? classes.inputerror : classes.input}
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            defaultValue={user.username}
          />
          <div className={classes.blockerror}>
            {errorList?.username ? <span className={classes.error}>This login is already taken</span> : null}
            {errors?.username?.type === 'required' && <span className={classes.error}>This field is required</span>}
            {errors?.username?.type === 'minLength' && <span className={classes.error}>Min length is 3</span>}
            {errors?.username?.type === 'maxLength' && <span className={classes.error}>Max length is 20</span>}
          </div>
          <input
            className={errors?.email || errorList?.email ? classes.inputerror : classes.input}
            {...register('email', {
              required: true,
              pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            })}
            defaultValue={user.email}
          />
          <div className={classes.blockerror}>
            {errorList?.email ? <span className={classes.error}>This email is already taken</span> : null}
            {errors?.email?.type === 'required' && <span className={classes.error}>This field is required</span>}
            {errors?.email?.type === 'pattern' && <span className={classes.error}>Email is uncorrect</span>}
          </div>
          <input
            className={errors?.password ? classes.inputerror : classes.input}
            {...register('password', {
              minLength: 6,
              maxLength: 20,
            })}
            placeholder="New password"
          />
          <div className={classes.blockerror}>
            {errors?.password?.type === 'minLength' && <span className={classes.error}>Min length is 6</span>}
            {errors?.password?.type === 'maxLength' && <span className={classes.error}>Max length is 20</span>}
          </div>
          <input
            className={errors?.url ? classes.inputerror : classes.input}
            {...register('image', {
              pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
            })}
            placeholder={user.image ? null : 'Avatar image (url)'}
            defaultValue={user.image ? user.image : null}
          />
          <div className={classes.blockerror}>
            {errors?.url?.type === 'pattern' && <span className={classes.error}>Paste validate url</span>}
          </div>
          <input type="submit" className={classes.submit} value="Изменить" />
        </form>
      </div>
    </div>
  )
}

export default Profile
