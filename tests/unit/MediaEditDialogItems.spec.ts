import { createVariations, matchSnapshot } from './utils'
import MediaEditDialogItems from '@/components/MediaEditDialogItems.vue'
import { mockedMediaAndListEntry } from './mocks/media'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('MediaEditDialogItems', () => {
  createVariations({
    propsData: {
      tab: () => Array.from({ length: 4 }, (v, k) => 'edit' + (k + 1)),
    },
  }).forEach(settings =>
    matchSnapshot(MediaEditDialogItems, {
      propsData: {
        ...settings.propsData,
        media: mockedMediaAndListEntry,
        user: mockedViewer,
      },
      provide: { ...useMockedStore() },
    }),
  )
})
