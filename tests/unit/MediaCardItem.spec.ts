import MediaItem from '@/components/MediaItem.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaItem', () => {
  matchSnapshot(MediaItem, {
    propsData: {
      media: mockedMedia,
    },
  })
})
