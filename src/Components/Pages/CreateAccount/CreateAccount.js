import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Authentication } from '../../../Api/Api.js'
import { getUser } from '../../../Redux/userSlicer'

import classes from './CreateAccount.module.scss'

function CreateAccount() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorList, setErrorList] = useState(0)
  const goSignIn = () => {
    navigate('/sign-in', { replace: true })
  }
  const apiAuthentication = new Authentication()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    apiAuthentication.register(data.username, data.email, data.password).then((e) => {
      if (e.errors) {
        console.log(e)
        setErrorList(e.errors)
      } else {
        console.log(e)
        localStorage.setItem('token', e.user.token)
        dispatch(getUser(e.user))
        goSignIn()
      }
    })
    reset()
  }
  return (
    <div className={classes.main}>
      <div className={classes.block}>
        <div className={classes.title}>Create new account</div>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <label>
            Username
            <input
              className={errors?.username || errorList?.username ? classes.inputerror : classes.input}
              {...register('username', {
                required: true,
                minLength: 3,
                maxLength: 20,
              })}
              placeholder="Username"
            />
            {errorList?.username ? <span className={classes.error}>This login is already taken</span> : null}
            {errors?.username?.type === 'required' && <span className={classes.error}>This field is required</span>}
            {errors?.username?.type === 'minLength' && <span className={classes.error}>Min length is 3</span>}
            {errors?.username?.type === 'maxLength' && <span className={classes.error}>Max length is 20</span>}
          </label>

          <label>
            Email address
            <input
              className={errors?.email || errorList?.email ? classes.inputerror : classes.input}
              {...register('email', {
                required: true,
                pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              })}
              placeholder="Email address"
            />
            {errorList?.email ? <span className={classes.error}>This email is already taken</span> : null}
            {errors?.email?.type === 'required' && <span className={classes.error}>This field is required</span>}
            {errors?.email?.type === 'pattern' && <span className={classes.error}>Email is uncorrect</span>}
          </label>

          <label>
            Password
            <input
              type="password"
              className={errors?.password ? classes.inputerror : classes.input}
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              placeholder="Password"
            />
            {errors?.password?.type === 'required' && <span className={classes.error}>This field is required</span>}
            {errors?.password?.type === 'minLength' && <span className={classes.error}>Min length is 6</span>}
            {errors?.password?.type === 'maxLength' && <span className={classes.error}>Max length is 20</span>}
          </label>
          <label>
            Repeat Password
            <input
              type="password"
              className={errors?.repassword ? classes.inputerror : classes.input}
              {...register('repassword', {
                required: true,
                validate: (value) => value == watch('password'),
              })}
              placeholder="Repeat Password"
            />
            <div className={classes.blockerror}>
              {errors?.repassword?.type === 'required' && <span className={classes.error}>This field is required</span>}
              {errors?.repassword?.type === 'validate' && <span className={classes.error}>Passwords must match</span>}
            </div>
          </label>

          <label className={errors?.checkbox ? classes.agreeerror : classes.agree}>
            <input
              type={'checkbox'}
              className={classes.checkbox}
              {...register('checkbox', {
                required: true,
              })}
            />
            I agree to the processing of my personal information
          </label>
          <div className={classes.blockerror}>
            {errors?.checkbox?.type === 'required' && <span className={classes.error}>This checkbox is required</span>}
          </div>
          <input type="submit" className={classes.submit} />
        </form>
        <span className={classes.have}>
          Already have an account? <Link to={'/sign-in'}>Sign In.</Link>
        </span>
      </div>
    </div>
  )
}

export default CreateAccount
