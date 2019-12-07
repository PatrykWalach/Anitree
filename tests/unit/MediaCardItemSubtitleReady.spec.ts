import MediaCardItemSubtitleReady from '@/components/MediaCardItemSubtitleReady.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardItemSubtitleReady', () => {
  matchSnapshot(MediaCardItemSubtitleReady, {
    propsData: {
      media: mockedMedia,
    },
  })
})
