import MediaItemTitle from '@/components/MediaItemTitle.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'
import { useMockedStore } from './mocks/store'

describe('MediaItemTitle', () => {
  matchSnapshot(MediaItemTitle, {
    propsData: {
      media: mockedMedia,
    },
    provide: { ...useMockedStore() },
  })
})
