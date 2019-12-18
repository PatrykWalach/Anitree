import MediaCardItemTitle from '@/components/MediaCardItemTitle.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'
import { useMockedStore } from './mocks/store'

describe('MediaCardItemTitle', () => {
  matchSnapshot(MediaCardItemTitle, {
    propsData: {
      media: mockedMedia,
    },
    provide: { ...useMockedStore() },
  })
})
