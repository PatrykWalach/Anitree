import * as reducers from './reducers'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

export const createStore = () =>
  configureStore({
    devTools: process.env.NODE_ENV === 'development',
    reducer: combineReducers(reducers),
  })

export const store = createStore()

export type Store = typeof store
export type State = ReturnType<Store['getState']>
