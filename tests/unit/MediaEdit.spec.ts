import MediaEdit from '@/components/MediaEdit.vue'

import { matchSnapshot } from './utils'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('MediaEdit', () => {
  matchSnapshot(MediaEdit, {
    propsData: {
      id: null,
      viewer: null,
    },
    ...useMockedStore(),
  })

  matchSnapshot(MediaEdit, {
    propsData: {
      id: 1,
      viewer: null,
    },
    ...useMockedStore(),
  })

  matchSnapshot(MediaEdit, {
    propsData: {
      id: null,
      viewer: mockedViewer,
    },
    ...useMockedStore(),
  })

  matchSnapshot(MediaEdit, {
    propsData: {
      id: 1,
      viewer: mockedViewer,
    },
    ...useMockedStore(),
  })
})
