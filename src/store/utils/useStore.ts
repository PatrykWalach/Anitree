import * as actions from '../actions'
import { InjectionKey, inject } from '@vue/composition-api'
import { Store } from '../'

export const key: InjectionKey<Store> = Symbol('store')

export const useStore = () => {
  const store = inject(key) as Store
  return {
    actions,
    dispatch: store.dispatch.bind(store),
    getState: store.getState.bind(store),
    subscribe: store.subscribe.bind(store),
  }
}
