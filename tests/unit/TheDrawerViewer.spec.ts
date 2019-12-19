import { createVariations, matchSnapshot } from './utils'
import TheDrawerViewer from '@/components/TheDrawerViewer.vue'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('TheDrawerViewer', () => {
  matchSnapshot(TheDrawerViewer, {
    propsData: {
      viewer: mockedViewer,
    },
    provide: { ...useMockedStore() },
  })
})
