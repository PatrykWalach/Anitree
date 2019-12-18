import MediaCardItemAvatar from '@/components/MediaCardItemAvatar.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('MediaCardItemAvatar', () => {
  matchSnapshot(MediaCardItemAvatar, {
    propsData: {
      media: mockedMedia,
    },
  })
})
