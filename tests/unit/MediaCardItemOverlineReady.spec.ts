import MediaCardItemOverlineReady from '@/components/MediaCardItemOverlineReady.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardItemOverlineReady', () => {
  matchSnapshot(MediaCardItemOverlineReady, {
    propsData: {
      media: mockedMedia,
    },
  })
})
