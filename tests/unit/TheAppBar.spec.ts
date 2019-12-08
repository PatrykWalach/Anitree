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
      ...useMockedStore(),
    }),
  )

  // matchSnapshot(
  //   TheAppBar,
  //   {
  //     mocks: {
  //       $route: {
  //         name: 'media-about',
  //         query: {},
  //       },
  //       $vuetify: {
  //         breakpoint: {
  //           xsOnly: false,
  //         },
  //       },
  //     },
  //     propsData: { media: mockedMedia },
  //     ...useMockedStore(),
  //   },
  //   'hides media tabs',
  // )

  // matchSnapshot(
  //   TheAppBar,
  //   {
  //     mocks: {
  //       $route: {
  //         name: 'media-about',
  //         query: {},
  //       },
  //       $vuetify: {
  //         breakpoint: {
  //           xsOnly: true,
  //         },
  //       },
  //     },
  //     propsData: { media: mockedMedia },
  //     ...useMockedStore(),
  //   },
  //   'shows media tabs',
  // )
})
