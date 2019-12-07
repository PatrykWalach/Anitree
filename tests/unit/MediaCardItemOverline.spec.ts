import MediaCardItemOverline from '@/components/MediaCardItemOverline.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardItemOverline', () => {
  matchSnapshot(MediaCardItemOverline, {
    propsData: {
      media: null,
    },
  })

  matchSnapshot(MediaCardItemOverline, {
    propsData: {
      media: mockedMedia,
    },
  })
})
