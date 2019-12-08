// mediaList: Media[] | null
// loading: boolean

import { createVariations, matchSnapshot } from './utils'
import TheMediaTimeline from '@/components/TheMediaTimeline.vue'
import { mockedMedia } from './mocks/media'

describe('TheMediaTimeline', () => {
  createVariations({
    propsData: {
      loading: () => [true, false],
      mediaList: () => [[], [mockedMedia], null],
    },
  }).forEach(settings => matchSnapshot(TheMediaTimeline, settings))
})
