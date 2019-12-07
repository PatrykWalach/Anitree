import MediaEditTabs from '@/components/MediaEditTabs.vue'

import { matchSnapshot } from './utils'

describe('MediaEditTabs', () => {
  matchSnapshot(MediaEditTabs, {
    propsData: {
      loading: false,
      tab: 'edit1',
    },
  })
  matchSnapshot(MediaEditTabs, {
    propsData: {
      loading: true,
      tab: 'edit1',
    },
  })
})
