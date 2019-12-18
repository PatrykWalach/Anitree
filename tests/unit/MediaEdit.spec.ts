import { createVariations, matchSnapshot } from './utils'
import MediaEdit from '@/components/MediaEdit.vue'
import { mockedViewer } from './mocks/viewer'
import { useMockedApollo } from './mocks/apollo'
import { useMockedStore } from './mocks/store'

describe('MediaEdit', () => {
  createVariations({
    propsData: {
      id: () => [null, 1],
      viewer: () => [null, mockedViewer],
    },
  }).forEach(settings =>
    matchSnapshot(MediaEdit, {
      ...settings,
      provide: { ...useMockedStore(), ...useMockedApollo() },
    }),
  )
})
