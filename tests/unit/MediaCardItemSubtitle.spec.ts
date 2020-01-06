import MediaItemSubtitle from '@/components/MediaItemSubtitle.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaItemSubtitle', () => {
  matchSnapshot(MediaItemSubtitle, {
    propsData: {
      media: mockedMedia,
    },
  })
})
