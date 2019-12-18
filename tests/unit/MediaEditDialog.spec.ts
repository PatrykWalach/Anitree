import MediaEditDialog from '@/components/MediaEditDialog.vue'
import { matchSnapshot } from './utils'
import { mockedMediaAndListEntry } from './mocks/media'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('MediaEditDialog', () => {
  matchSnapshot(MediaEditDialog, {
    propsData: {
      media: mockedMediaAndListEntry,
      viewer: mockedViewer,
    },
    provide: {
      ...useMockedStore(),
    },
  })
})
