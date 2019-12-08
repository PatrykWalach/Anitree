import TheAppBarExtensionTabs from '@/components/TheAppBarExtensionTabs.vue'

import { matchSnapshot } from './utils'

describe('TheAppBarExtensionTabs', () => {
  matchSnapshot(TheAppBarExtensionTabs, {
    mocks: {
      $route: { params: {} },
    },
  })
})
