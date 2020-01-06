import MediaItemOverline from '@/components/MediaItemOverline.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaItemOverline', () => {
  matchSnapshot(MediaItemOverline, {
    propsData: {
      media: mockedMedia,
    },
  })
})
