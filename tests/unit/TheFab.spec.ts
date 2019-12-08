import { createVariations, matchSnapshot } from './utils'
import TheFab from '@/components/TheFab.vue'
import { useMockedStore } from './mocks/store'

describe('TheFab', () => {
  createVariations({
    mocks: {
      $route: () => [
        ...createVariations({
          name: () => ['search', 'home'],
        }),
        ...createVariations({
          name: () => ['media-timeline', 'media-about'],
          params: {
            mediaId: 1,
          },
        }),
      ],
    },
  }).forEach(settings =>
    matchSnapshot(TheFab, {
      ...settings,
      ...useMockedStore(),
    }),
  )
})
