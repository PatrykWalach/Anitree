import MediaEditDialogActions from '@/components/MediaEditDialogActions.vue'
import { matchSnapshot } from './utils'
import { mockedMediaAndListEntry } from './mocks/media'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('MediaEditDialogActions', () => {
  matchSnapshot(MediaEditDialogActions, {
    propsData: {
      media: mockedMediaAndListEntry,
      viewer: mockedViewer,
    },
    provide: { ...useMockedStore() },
  })
})
