import { createSlice } from '@reduxjs/toolkit'

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState: {
    value: 1,
  },
  reducers: {
    setPage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value = action.payload
    },
  },
})

export const PAGE_ID = {
  DOCUMENTS: 1,
  GOOGLE_DRIVE: 2,
  MSONE_DRIVE: 3,
  SETTINGS: 4,
}

// Action creators are generated for each case reducer function
export const { setPage } = currentPageSlice.actions

export default currentPageSlice.reducer