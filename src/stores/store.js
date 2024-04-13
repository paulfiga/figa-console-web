import { configureStore } from '@reduxjs/toolkit'
import currentPageReducer from '@/stores/currentPageSlice'

export default configureStore({
  reducer: {
    currentPage: currentPageReducer,
  },
})