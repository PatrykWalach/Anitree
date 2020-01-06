import { createVariations, matchSnapshot } from './utils'
import TheMediaAboutTags from '@/components/TheMediaAboutTags.vue'
import { mockedMedia } from './mocks/media'

describe('TheMediaAboutTags', () => {
  createVariations({
    propsData: {
      media: () => [mockedMedia, null],
    },
  }).forEach(settings => matchSnapshot(TheMediaAboutTags, settings))
})
