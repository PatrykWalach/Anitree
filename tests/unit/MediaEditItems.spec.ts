import { createVariations, matchSnapshot } from './utils'
import MediaEditItems from '@/components/MediaEditItems.vue'
import { mockedMediaAndListEntry } from './mocks/media'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'


describe('MediaEditItems', () => {
  createVariations({
    propsData: {
      tab: () => Array.from({ length: 4 }, (v, k) => 'edit' + (k + 1)),
    },
  }).forEach(settings =>
    matchSnapshot(MediaEditItems, {
      propsData: {
        ...settings.propsData,
        media: mockedMediaAndListEntry,
        user: mockedViewer,
      },
      ...useMockedStore(),
    }),
  )
})
