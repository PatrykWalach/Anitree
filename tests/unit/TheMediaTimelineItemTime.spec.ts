import TheMediaTimelineItemTime from '@/components/TheMediaTimelineItemTime.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'

describe('TheMediaTimelineItemTime', () => {
  matchSnapshot(TheMediaTimelineItemTime, {
    propsData: {
      media: mockedMedia,
    },
  })
})
