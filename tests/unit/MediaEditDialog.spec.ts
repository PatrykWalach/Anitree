import MediaEdit from '@/components/MediaEdit.vue'
import { matchSnapshot } from './utils'
import { mockedMediaAndListEntry } from './mocks/media'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('MediaEdit', () => {
  matchSnapshot(MediaEdit, {
    propsData: {
      media: mockedMediaAndListEntry,
      viewer: mockedViewer,
    },
    provide: {
      ...useMockedStore(),
    },
  })
})
