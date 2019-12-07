import MediaCard from '@/components/MediaCard.vue'

import { matchSnapshot } from './utils'

describe('MediaCard', () => {
  matchSnapshot(MediaCard, {
    propsData: {
      id: 1,
    },
  })
})
