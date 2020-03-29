import { createVariations, matchSnapshot } from './utils'
import TheDrawer from '@/components/TheDrawer.vue'
import { useMockedApollo } from './mocks/apollo'
import { useMockedStore } from './mocks/store'

describe('TheDrawer', () => {
  createVariations({
    mocks: {
      $route: () => [
        ...createVariations({
          name: () => ['search', 'home'],
        }),
        ...createVariations({
          name: () => ['timeline', 'timeline'],
          params: {
            mediaId: 1,
          },
        }),
      ],
    },
    propsData: {
      value: () => [true, false],
    },
  }).forEach((settings) =>
    matchSnapshot(TheDrawer, {
      ...settings,
      provide: { ...useMockedStore(), ...useMockedApollo() },
    }),
  )
})
