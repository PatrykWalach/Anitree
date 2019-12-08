// media: Media | null
// popularity: boolean

import { createVariations, matchSnapshot } from './utils'
import TheMediaAboutRanking from '@/components/TheMediaAboutRanking.vue'
import { mockedMedia } from './mocks/media'

describe('TheMediaAboutRanking', () => {
  createVariations({
    propsData: {
      media: () => [mockedMedia, null],
      popularity: () => [true, false],
    },
  }).forEach(settings => matchSnapshot(TheMediaAboutRanking, settings))
})
