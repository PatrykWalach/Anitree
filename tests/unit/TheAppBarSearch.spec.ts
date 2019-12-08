import TheAppBarSearch from '@/components/TheAppBarSearch.vue'

import { matchSnapshot } from './utils'

describe('TheAppBarSearch', () => {
  matchSnapshot(TheAppBarSearch, {
    mocks: {
      $route: {
        query: {
          search: '',
        },
      },
    },
  })
})
