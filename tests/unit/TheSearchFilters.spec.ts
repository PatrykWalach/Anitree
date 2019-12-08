import TheSearchFilters from '@/components/TheSearchFilters.vue'
import { matchSnapshot } from './utils'
import { useMockedStore } from './mocks/store'

describe('TheSearchFilters', () => {
  matchSnapshot(TheSearchFilters, {
    mocks: {
      $route: {
        query: {},
      },
    },
    ...useMockedStore(),
  })
})
