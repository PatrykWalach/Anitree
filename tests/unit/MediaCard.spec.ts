import MediaCard from '@/components/MediaCard.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCard', () => {
  matchSnapshot(MediaCard, {
    propsData: {
      media: mockedMedia,
    },
  })
})
