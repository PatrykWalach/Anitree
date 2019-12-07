import MediaCardItemTitleReady from '@/components/MediaCardItemTitleReady.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'
import { useMockedStore } from './mocks/store'

describe('MediaCardItemTitleReady', () => {
  matchSnapshot(MediaCardItemTitleReady, {
    propsData: {
      media: mockedMedia,
    },
    ...useMockedStore(),
  })
})
