import TheAppBar from '@/components/TheAppBar.vue'

import { matchSnapshot } from './utils'
import { mockedMedia } from './mocks/media'
import { useMockedStore } from './mocks/store'

describe('TheAppBar', () => {
  matchSnapshot(
    TheAppBar,
    {
      mocks: {
        $route: {
          name: 'home',
          query: {},
        },
      },
      propsData: { media: null },
      ...useMockedStore(),
    },
    'shows site name',
  )
  matchSnapshot(
    TheAppBar,
    {
      mocks: {
        $route: {
          name: 'settings',
          query: {},
        },
      },
      propsData: { media: null },
      ...useMockedStore(),
    },
    'shows route title',
  )
  matchSnapshot(
    TheAppBar,
    {
      mocks: {
        $route: {
          name: 'search',
          query: {},
        },
      },
      propsData: { media: null },
      ...useMockedStore(),
    },
    'shows nav chips',
  )

  matchSnapshot(
    TheAppBar,
    {
      mocks: {
        $route: {
          name: 'search',
          query: { search: 'test' },
        },
      },
      propsData: { media: null },
      ...useMockedStore(),
    },
    'shows search chips',
  )

  matchSnapshot(TheAppBar, {
    mocks: {
      $route: {
        name: 'media-about',
        query: {},
      },
      $vuetify: {
        breakpoint: {
          xsOnly: true,
        },
      },
    },
    propsData: { media: null },
    ...useMockedStore(),
  })

  matchSnapshot(TheAppBar, {
    mocks: {
      $route: {
        name: 'media-about',
        query: {},
      },
      $vuetify: {
        breakpoint: {
          xsOnly: false,
        },
      },
    },
    propsData: { media: null },
    ...useMockedStore(),
  })

  matchSnapshot(
    TheAppBar,
    {
      mocks: {
        $route: {
          name: 'media-about',
          query: {},
        },
        $vuetify: {
          breakpoint: {
            xsOnly: false,
          },
        },
      },
      propsData: { media: mockedMedia },
      ...useMockedStore(),
    },
    'shows media image',
  )
})
