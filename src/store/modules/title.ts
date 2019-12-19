import { getItem, setItem } from '@/store/utils/localStorage'
import { createSlice } from '@reduxjs/toolkit'

const key = 'TITLE'

const initialState = getItem(key, {
  prefered: 0,
})

export const { reducer: title, actions: titleActions } = createSlice({
  initialState,
  name: 'title',
  reducers: {
    CHANGE_PREFERED: (state, { payload }: { payload: number }) => {
      state.prefered = payload
      setItem(key, state)
    },
  },
})
