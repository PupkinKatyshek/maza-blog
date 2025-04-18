import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  articlescount: 0,
  skipNumber: 0,
  isLoading: false,
  currentPage: '',
  changedMark: 0,
}

const apiSlicer = createSlice({
  name: 'blog',
  initialState,

  reducers: {
    getarticles(state, action) {
      state.articles = action.payload
    },
    getarticlescount(state, action) {
      state.articlescount = action.payload
    },
    offset(state, action) {
      state.skipNumber = action.payload
    },
    loading(state, action) {
      state.isLoading = action.payload
    },
    getCurrentPage(state, action) {
      state.currentPage = action.payload
    },

    changedMark(state) {
      state.changedMark = state.changedMark + 1
    },
  },
})

export const { changedMark, getarticles, offset, loading, getarticlescount, getCurrentPage } = apiSlicer.actions

export default apiSlicer.reducer
