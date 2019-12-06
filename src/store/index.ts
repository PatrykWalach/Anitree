import * as actions from './actions'
import * as reducers from './reducers'

import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({ reducer: combineReducers(reducers) })

export const useActions = () => actions
export type Store = typeof store
export type State = ReturnType<Store['getState']>

export * from './utils'
