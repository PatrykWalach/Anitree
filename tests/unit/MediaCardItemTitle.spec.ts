import MediaCardItemTitle from '@/components/MediaCardItemTitle.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardItemTitle', () => {
  matchSnapshot(MediaCardItemTitle, {
    propsData: {
      media: null,
    },
  })

  matchSnapshot(MediaCardItemTitle, {
    propsData: {
      media: mockedMedia,
    },
  })
})
