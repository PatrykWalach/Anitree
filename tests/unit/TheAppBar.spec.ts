import { createVariations, matchSnapshot } from './utils'
import TheAppBar from '@/components/TheAppBar.vue'
import { useMockedStore } from './mocks/store'

describe('TheAppBar', () => {
  createVariations({
    mocks: {
      $route: () => [
        ...createVariations({
          name: () => ['home', 'settings', 'search'],
          query: {},
        }),
        {
          name: 'search',
          query: { search: 'test' },
        },
      ],
    },
  }).forEach(settings =>
    matchSnapshot(TheAppBar, {
      propsData: { media: null },
      ...settings,
      provide: useMockedStore(),
    }),
  )
})
