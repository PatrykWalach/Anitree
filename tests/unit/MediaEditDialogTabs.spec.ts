import { createVariations, matchSnapshot } from './utils'
import MediaEditTabs from '@/components/MediaEditTabs.vue'

describe('MediaEditTabs', () => {
  createVariations({
    propsData: {
      tab: () => Array.from({ length: 4 }, (v, k) => 'edit' + (k + 1)),
    },
  }).forEach(settings => matchSnapshot(MediaEditTabs, settings))
})
