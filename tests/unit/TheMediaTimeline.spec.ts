import TheMediaTimeline from '@/components/TheMediaTimeline.vue'
import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('TheMediaTimeline', () => {
  matchSnapshot(TheMediaTimeline, {
    propsData: {
      mediaList: [mockedMedia],
    },
  })
})
