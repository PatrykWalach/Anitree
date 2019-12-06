import { createSlice } from '@reduxjs/toolkit'

const cache = localStorage.getItem('SETTINGS')

const stored = cache && JSON.parse(cache)

const storedCacheApollo: boolean = (stored && stored.cacheApollo) || false

const storedCacheChanges: boolean = (stored && stored.cacheChanges) || false

const storedToken: string | null = (stored && stored.token) || null

const storedSyncChanges: boolean = (stored && stored.syncChanges) || false

export const { reducer: settings, actions: settingsActions } = createSlice({
  initialState: {
    cacheApollo: storedCacheApollo,
    cacheChanges: storedCacheChanges,
    syncChanges: storedSyncChanges,
    token: storedToken,
  },
  name: 'settings',
  reducers: {
    CHANGE_CACHE_APOLLO: (state, { payload }: { payload: boolean }) => {
      state.cacheApollo = payload
      localStorage.setItem('SETTINGS', JSON.stringify(state))
    },
    CHANGE_CACHE_CHANGES: (state, { payload }: { payload: boolean }) => {
      state.cacheChanges = payload
      localStorage.setItem('SETTINGS', JSON.stringify(state))
    },
    CHANGE_SYNC_CHANGES: (state, { payload }: { payload: boolean }) => {
      state.syncChanges = payload
      localStorage.setItem('SETTINGS', JSON.stringify(state))
    },
    CHANGE_TOKEN: (state, { payload }: { payload: string | null }) => {
      state.token = payload
      localStorage.setItem('SETTINGS', JSON.stringify(state))
    },
  },
})
