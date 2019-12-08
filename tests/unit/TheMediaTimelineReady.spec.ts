import TheMediaTimelineReady from '@/components/TheMediaTimelineReady.vue'
import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('TheMediaTimelineReady', () => {
  matchSnapshot(TheMediaTimelineReady, {
    propsData: {
      mediaList: [mockedMedia],
    },
  })
})
