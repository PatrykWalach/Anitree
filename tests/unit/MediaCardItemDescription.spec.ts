import MediaCardItemDescription from '@/components/MediaCardItemDescription.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardItemDescription', () => {
  matchSnapshot(MediaCardItemDescription, {
    propsData: {
      media: mockedMedia,
    },
  })
})
