import { createVariations, matchSnapshot } from './utils'
import TheDrawerViewer from '@/components/TheDrawerViewer.vue'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('TheDrawerViewer', () => {
  createVariations({
    propsData: {
      viewer: () => [mockedViewer, null],
    },
  }).forEach(settings =>
    matchSnapshot(TheDrawerViewer, {
      ...settings,
      provide: { ...useMockedStore() },
    }),
  )
})
