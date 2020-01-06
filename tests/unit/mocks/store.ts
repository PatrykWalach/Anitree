import { createStore } from '@/store'

import { key } from 'vue-redux-hooks'

export const useMockedStore = () => {
  const store = createStore()
  return {
    [key]: store,
  }
}
