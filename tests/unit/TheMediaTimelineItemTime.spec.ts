import TheTimelineItemTime from '@/components/TheTimelineItemTime.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('TheTimelineItemTime', () => {
  matchSnapshot(TheTimelineItemTime, {
    propsData: {
      media: mockedMedia,
    },
  })
})
