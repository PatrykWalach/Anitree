import BaseShare from '@/components/BaseShare.vue'

import { matchSnapshot } from './utils'
import { useMockedStore } from './mocks/store'

describe('BaseShare', () => {
  matchSnapshot(BaseShare, {
    propsData: {
      options: null,
    },
    ...useMockedStore(),
  })
})
