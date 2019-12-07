import MediaEditActions from '@/components/MediaEditActions.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('MediaEditActions', () => {
  matchSnapshot(MediaEditActions, {
    propsData: {
      media: null,
      user: null,
    },
    ...useMockedStore(),
  })

  matchSnapshot(MediaEditActions, {
    propsData: {
      media: mockedMedia,
      user: null,
    },
    ...useMockedStore(),
  })

  matchSnapshot(MediaEditActions, {
    propsData: {
      media: null,
      user: mockedViewer,
    },
    ...useMockedStore(),
  })

  matchSnapshot(MediaEditActions, {
    propsData: {
      media: mockedMedia,
      user: mockedViewer,
    },
    ...useMockedStore(),
  })
})
