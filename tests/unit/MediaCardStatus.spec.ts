import MediaCardStatus from '@/components/MediaCardStatus.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardStatus', () => {
  matchSnapshot(MediaCardStatus, {
    propsData: {
      media: null,
    },
  })

  matchSnapshot(MediaCardStatus, {
    propsData: {
      media: mockedMedia,
    },
  })
})
