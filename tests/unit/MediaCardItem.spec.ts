import MediaCardItem from '@/components/MediaCardItem.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardItem', () => {
  matchSnapshot(MediaCardItem, {
    propsData: {
      media: null,
    },
  })
  matchSnapshot(MediaCardItem, {
    propsData: {
      media: mockedMedia,
    },
  })
})
