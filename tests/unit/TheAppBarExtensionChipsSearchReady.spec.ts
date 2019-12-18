import TheAppBarExtensionChipsSearchReady from '@/components/TheAppBarExtensionChipsSearchReady.vue'

import { matchSnapshot } from './utils'
import { mockedPageAndMedia } from './mocks/page'
import { useMockedStore } from './mocks/store'

describe('TheAppBarExtensionChipsSearchReady', () => {
  matchSnapshot(TheAppBarExtensionChipsSearchReady, {
    propsData: {
      page: mockedPageAndMedia,
    },
    provide: { ...useMockedStore() },
  })
})
