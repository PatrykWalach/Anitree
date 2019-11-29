import { createSlice } from '@reduxjs/toolkit'

export const { reducer: filter, actions: filterActions } = createSlice({
  initialState: { isShown: false },
  name: 'filter',
  reducers: {
    CHANGE_IS_SHOWN: (state, { payload }: { payload: boolean }) => {
      state.isShown = payload
    },
  },
})
