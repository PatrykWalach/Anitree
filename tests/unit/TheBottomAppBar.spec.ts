import { createVariations, matchSnapshot } from './utils'
import TheBottomAppBar from '@/components/TheBottomAppBar.vue'
import { mockedMedia } from './mocks/media'
import { useMockedStore } from './mocks/store'

describe('TheBottomAppBar', () => {
  createVariations({
    mocks: { $route: { name: () => ['home', 'title-timeline'] } },
    propsData: {
      drawer: () => [true, false],
      media: () => [mockedMedia, null],
    },
  }).forEach(props =>
    matchSnapshot(TheBottomAppBar, {
      ...props,
      ...useMockedStore(),
    }),
  )
})
