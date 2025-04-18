import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ApiArticles } from '../../../Api/Api.js'
import Spiner from '../Spiner'
import { loading } from '../../../Redux/apiSlicer'

import classes from './CreateArticle.module.scss'

function CreateArticle() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorList, setErrorList] = useState(0)
  const apiApiArticles = new ApiArticles()
  const element = useSelector((state) => state.apiSlicer.currentPage)
  const user = useSelector((state) => state.userSlicer.user)
  const { pathname } = useLocation()
  const isLoading = useSelector((state) => state.apiSlicer.isLoading)

  const goToArticle = (el) => {
    navigate(`/${el.article.slug}`, { replace: true })
  }
  const gosign = () => {
    navigate('/', { replace: true })
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      tagList: pathname == '/new-article' ? null : element.tagList,
    },
  })

  useEffect(() => {
    dispatch(loading(false))
    const token = localStorage.getItem('token')

    if (!token || !user.username || !element.author.username || !user.username === element.author.username) {
      gosign()
    }
  }, [])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const onSubmit = (data) => {
    dispatch(loading(true))
    if (pathname == '/new-article') {
      apiApiArticles.createArgticle(data).then((e) => {
        if (e.errors) {
          setErrorList(e.errors)
        } else {
          goToArticle(e)
        }
      })
    } else {
      apiApiArticles
        .updateArgticle(data, element.slug)
        .then((e) => {
          if (e.errors) {
            setErrorList(e.errors)
          } else {
            goToArticle(e)
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
    reset()
  }

  return isLoading ? (
    <Spiner />
  ) : (
    <div className={classes.block}>
      <div className={classes.title}>{pathname == '/new-article' ? 'Create new article' : 'Edit article'}</div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title
          <input
            className={errors?.title || errorList?.username ? classes.inputerror : classes.input}
            {...register('title', {
              required: true,
            })}
            placeholder="Title"
            defaultValue={pathname == '/new-article' ? null : element.title}
          />
        </label>

        {errors?.title?.type === 'required' && <span className={classes.error}>This field is required</span>}
        <label>
          Short description
          <input
            className={errors?.description || errorList?.username ? classes.inputerror : classes.input}
            {...register('description', {
              required: true,
            })}
            placeholder="Title"
            defaultValue={pathname == '/new-article' ? null : element.description}
          />
        </label>
        {errors?.description?.type === 'required' && <span className={classes.error}>This field is required</span>}

        <label>
          Text
          <textarea
            className={errors?.body || errorList?.username ? classes.texterror : classes.inputtext}
            {...register('body', {
              required: true,
            })}
            placeholder="Text"
            defaultValue={pathname == '/new-article' ? null : element.body}
          />
        </label>

        {errors?.body?.type === 'required' && <span className={classes.error}>This field is required</span>}
        <span>Tags</span>
        <div className={classes.blocktag}>
          <ul className={classes.list}>
            {fields.map((item, index) => {
              return (
                <li className={classes.listitem} key={item.id}>
                  <input
                    className={classes.tag}
                    {...register(`tagList.${index}`, { required: true })}
                    placeholder="Tag"
                  />

                  <button className={classes.tagbtn} type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            className={classes.addtagbtn}
            type="button"
            onClick={() => {
              append()
            }}
          >
            Add tag
          </button>
        </div>
        <input type="submit" className={classes.submit} />
      </form>
    </div>
  )
}

export default CreateArticle
