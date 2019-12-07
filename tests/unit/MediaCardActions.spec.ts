import MediaCardActions from '@/components/MediaCardActions.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'
import { useMockedStore } from './mocks/store'

describe('MediaCardActions', () => {
  matchSnapshot(MediaCardActions, {
    propsData: {
      media: null,
    },
    ...useMockedStore(),
  })
  matchSnapshot(MediaCardActions, {
    propsData: {
      media: mockedMedia,
    },
    ...useMockedStore(),
  })
})
