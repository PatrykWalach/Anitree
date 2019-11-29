import * as reducers from './reducers'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({ reducer: combineReducers(reducers) })

export type Store = typeof store
export type State = ReturnType<Store['getState']>

export * from './utils'
