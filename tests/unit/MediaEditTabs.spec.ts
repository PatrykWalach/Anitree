import { createVariations, matchSnapshot } from './utils'
import MediaEditTabs from '@/components/MediaEditTabs.vue'

describe('MediaEditTabs', () => {
  createVariations({
    propsData: {
      loading: () => [false, true],
      tab: () => Array.from({ length: 4 }, (v, k) => 'edit' + (k + 1)),
    },
  }).forEach(settings => matchSnapshot(MediaEditTabs, settings))
})
