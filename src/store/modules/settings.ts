import { createSlice } from '@reduxjs/toolkit'
import { getItem, setItem } from '@/store/utils/localStorage'

const key = 'SETTINGS'
const initialState = getItem(key, {
  cacheApollo: false,
  cacheChanges: false,
  syncChanges: false,
  token: null as string | null,
})

export const { reducer: settings, actions: settingsActions } = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    CHANGE_CACHE_APOLLO: (state, { payload }: { payload: boolean }) => {
      state.cacheApollo = payload
      setItem(key, state)
    },
    CHANGE_CACHE_CHANGES: (state, { payload }: { payload: boolean }) => {
      state.cacheChanges = payload
      setItem(key, state)
    },
    CHANGE_SYNC_CHANGES: (state, { payload }: { payload: boolean }) => {
      state.syncChanges = payload
      setItem(key, state)
    },
    CHANGE_TOKEN: (state, { payload }: { payload: string | null }) => {
      state.token = payload
      setItem(key, state)
    },
  },
})
