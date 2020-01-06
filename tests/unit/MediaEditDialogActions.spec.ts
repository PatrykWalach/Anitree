import MediaEditActions from '@/components/MediaEditActions.vue'
import { matchSnapshot } from './utils'
import { mockedMediaAndListEntry } from './mocks/media'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('MediaEditActions', () => {
  matchSnapshot(MediaEditActions, {
    propsData: {
      media: mockedMediaAndListEntry,
      viewer: mockedViewer,
    },
    provide: { ...useMockedStore() },
  })
})
