import { getItem, setItem } from '@/localStorage'
import { createSlice } from '@reduxjs/toolkit'

const key = 'SETTINGS'
const initialState = getItem(key, {
  token: null as string | null,
})

export const { reducer: settings, actions: settingsActions } = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    CHANGE_TOKEN: (state, { payload }: { payload: string | null }) => {
      state.token = payload
      setItem(key, state)
    },
  },
})
