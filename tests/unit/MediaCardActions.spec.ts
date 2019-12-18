import MediaCardActions from '@/components/MediaCardActions.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'
import { useMockedApollo } from './mocks/apollo'
import { useMockedStore } from './mocks/store'

describe('MediaCardActions', () => {
  matchSnapshot(MediaCardActions, {
    propsData: {
      media: mockedMedia,
    },
    provide: {
      ...useMockedStore(),
      ...useMockedApollo(),
    },
  })
})
