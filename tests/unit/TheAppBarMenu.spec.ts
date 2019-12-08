import { createVariations, matchSnapshot } from './utils'
import TheAppBarMenu from '@/components/TheAppBarMenu.vue'
import { mockedMedia } from './mocks/media'

describe('TheAppBarMenu', () => {
  createVariations({
    propsData: {
      actions: [],
      media: () => [mockedMedia, null],
    },
  }).forEach(settings => matchSnapshot(TheAppBarMenu, settings))
})
