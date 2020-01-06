import MediaItemAvatar from '@/components/MediaItemAvatar.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaItemAvatar', () => {
  matchSnapshot(MediaItemAvatar, {
    propsData: {
      media: mockedMedia,
    },
  })
})
