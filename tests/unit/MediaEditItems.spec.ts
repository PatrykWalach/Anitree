import MediaEditItems from '@/components/MediaEditItems.vue'

import { matchSnapshot } from './utils'
import { mockedMediaAndListEntry } from './mocks/media'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('MediaEditItems', () => {
  matchSnapshot(MediaEditItems, {
    propsData: {
      media: mockedMediaAndListEntry,
      tab: 'edit1',
      user: mockedViewer,
    },
    ...useMockedStore(),
  })
  matchSnapshot(MediaEditItems, {
    propsData: {
      media: mockedMediaAndListEntry,
      tab: 'edit2',
      user: mockedViewer,
    },
    ...useMockedStore(),
  })
  matchSnapshot(MediaEditItems, {
    propsData: {
      media: mockedMediaAndListEntry,
      tab: 'edit3',
      user: mockedViewer,
    },
    ...useMockedStore(),
  })
  matchSnapshot(MediaEditItems, {
    propsData: {
      media: mockedMediaAndListEntry,
      tab: 'edit4',
      user: mockedViewer,
    },
    ...useMockedStore(),
  })
})
