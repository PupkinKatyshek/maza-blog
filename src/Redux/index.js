import { configureStore } from '@reduxjs/toolkit'

import aSlicer from './apiSlicer.js'
import uSlicer from './userSlicer.js'

export default configureStore({
  reducer: {
    apiSlicer: aSlicer,
    userSlicer: uSlicer,
  },
})
