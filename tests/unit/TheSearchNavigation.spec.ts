// user: null | User

import { createVariations, matchSnapshot } from './utils'
import TheSearchNavigation from '@/components/TheSearchNavigation.vue'
import { mockedViewer } from './mocks/viewer'

describe('TheSearchNavigation', () => {
  createVariations({
    propsData: {
      user: () => [null, mockedViewer],
    },
  }).forEach(settings => matchSnapshot(TheSearchNavigation, settings))
})
