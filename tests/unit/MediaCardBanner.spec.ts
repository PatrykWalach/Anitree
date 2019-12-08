import MediaCardBanner from '@/components/MediaCardBanner.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardBanner', () => {
  matchSnapshot(MediaCardBanner, {
    propsData: {
      media: null,
    },
  })
  matchSnapshot(MediaCardBanner, {
    propsData: {
      media: mockedMedia,
    },
  })
})
