import { createVariations, matchSnapshot } from './utils'
import TheAppBarExtensionChips from '@/components/TheAppBarExtensionChips.vue'

describe('TheAppBarExtensionChips', () => {
  createVariations({
    mocks: {
      $route: { query: { search: () => ['', 'test'] } },
    },
  }).forEach(settings => matchSnapshot(TheAppBarExtensionChips, settings))
})
