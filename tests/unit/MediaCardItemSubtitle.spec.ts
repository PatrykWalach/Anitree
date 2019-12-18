import MediaCardItemSubtitle from '@/components/MediaCardItemSubtitle.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardItemSubtitle', () => {
  matchSnapshot(MediaCardItemSubtitle, {
    propsData: {
      media: mockedMedia,
    },
  })
})
