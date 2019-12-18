import * as reducers from '@/store/reducers'

import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { key } from 'vue-redux-hooks'

export const mockStore = () =>
  configureStore({ reducer: combineReducers(reducers) })

export const useMockedStore = () => {
  const store = mockStore()
  return {
    [key]: store,
  }
}
