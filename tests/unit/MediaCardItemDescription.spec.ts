import MediaItemDescription from '@/components/MediaItemDescription.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaItemDescription', () => {
  matchSnapshot(MediaItemDescription, {
    propsData: {
      media: mockedMedia,
    },
  })
})
