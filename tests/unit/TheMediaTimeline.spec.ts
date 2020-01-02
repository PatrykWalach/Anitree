import TheTimeline from '@/components/TheTimeline.vue'
import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('TheTimeline', () => {
  matchSnapshot(TheTimeline, {
    propsData: {
      mediaList: [mockedMedia],
    },
  })
})
