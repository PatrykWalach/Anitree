import { createVariations, matchSnapshot } from './utils'
import MediaEditActions from '@/components/MediaEditActions.vue'
import { mockedMedia } from './mocks/media'
import { mockedViewer } from './mocks/viewer'
import { useMockedStore } from './mocks/store'

describe('MediaEditActions', () => {
  createVariations({
    propsData: {
      media: () => [null, mockedMedia],
      user: () => [null, mockedViewer],
    },
  }).forEach(settings =>
    matchSnapshot(MediaEditActions, {
      ...settings,
      ...useMockedStore(),
    }),
  )
})
