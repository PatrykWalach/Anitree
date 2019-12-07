import MediaCardTime from '@/components/MediaCardTime.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardTime', () => {
  matchSnapshot(MediaCardTime, {
    propsData: {
      media: mockedMedia,
    },
  })
})
