import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLogin: false,
}

const userSlicer = createSlice({
  name: 'user',
  initialState,

  reducers: {
    getUser(state, action) {
      state.user = action.payload
    },
    login(state, action) {
      state.isLogin = action.payload
    },
  },
})

export const { getUser, login } = userSlicer.actions

export default userSlicer.reducer
