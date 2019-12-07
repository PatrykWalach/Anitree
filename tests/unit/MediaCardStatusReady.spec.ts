import MediaCardStatusReady from '@/components/MediaCardStatusReady.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardStatusReady', () => {
  matchSnapshot(MediaCardStatusReady, {
    propsData: {
      media: mockedMedia,
    },
  })
})
