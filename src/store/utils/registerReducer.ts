// import * as reducers from '../reducers'
// import { Reducer, ReducersMapObject, combineReducers } from 'redux'
// import { EnhancedStore } from '@reduxjs/toolkit'
// import { store, useStore } from '../'

// const staticReducers: ReducersMapObject<any, any> = reducers
// const asyncReducers: ReducersMapObject<any, any> = {}

// export const registerReducer = <K extends string, R extends Reducer<any>>(
//   key: K,
//   asyncReducer: R,
// ) => {
//   asyncReducers[key] = asyncReducer
//   store.replaceReducer(createReducer(asyncReducers) as any)

//   return () =>
//     useStore<
//       typeof store extends EnhancedStore<infer S>
//         ? EnhancedStore<S & { [key in K]: R }>
//         : any
//     >()
// }

// export const unregisterReducer = <K extends string>(key: K) => {
//   delete asyncReducers[key]
//   store.replaceReducer(createReducer(asyncReducers) as any)
//   return () =>
//     useStore<
//       typeof store extends EnhancedStore<infer S>
//         ? EnhancedStore<Omit<S, K>>
//         : any
//     >()
// }

// const createReducer = (asyncReducers: ReducersMapObject<any, any> = {}) =>
//   combineReducers({
//     ...staticReducers,
//     ...asyncReducers,
//   })
