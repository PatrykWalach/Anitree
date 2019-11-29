import { createSlice } from '@reduxjs/toolkit'

const stored: string | null = localStorage.getItem('TITLE')

export const { reducer: title, actions: titleActions } = createSlice({
  initialState: {
    prefered: (stored && parseInt(stored)) || 0,
  },
  name: 'title',
  reducers: {
    CHANGE_PREFERED: (state, { payload }: { payload: number }) => {
      localStorage.setItem('TITLE', payload.toString())
      state.prefered = payload
    },
  },
})
