import { createVariations, matchSnapshot } from './utils'
import MediaEditDialogTabs from '@/components/MediaEditDialogTabs.vue'

describe('MediaEditDialogTabs', () => {
  createVariations({
    propsData: {
      tab: () => Array.from({ length: 4 }, (v, k) => 'edit' + (k + 1)),
    },
  }).forEach(settings => matchSnapshot(MediaEditDialogTabs, settings))
})
