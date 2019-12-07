import MediaCardItemDescriptionReady from '@/components/MediaCardItemDescriptionReady.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardItemDescriptionReady', () => {
  matchSnapshot(MediaCardItemDescriptionReady, {
    propsData: {
      media: mockedMedia,
    },
  })
})
