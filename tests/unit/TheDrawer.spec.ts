import { createVariations, matchSnapshot } from './utils'
import TheDrawer from '@/components/TheDrawer.vue'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('TheDrawer', () => {
  createVariations({
    mocks: {
      $route: () => [
        ...createVariations({
          name: () => ['search', 'home'],
        }),
        ...createVariations({
          name: () => ['media-timeline', 'media-about'],
          params: {
            mediaId: 1,
          },
        }),
      ],
    },
    propsData: {
      value: () => [true, false],
      viewer: () => [mockedViewer, null],
    },
  }).forEach(settings =>
    matchSnapshot(TheDrawer, {
      ...settings,
      provide: { ...useMockedStore() },
    }),
  )
})
