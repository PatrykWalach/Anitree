import { createVariations, matchSnapshot } from './utils'
import { mockedDeletePending, mockedSavePending } from './mocks/actions'
import ChangeCard from '@/components/ChangeCard.vue'
import { useMockedApollo } from './mocks/apollo'

describe('ChangeCard', () => {
  createVariations({
    propsData: {
      request: () => [mockedDeletePending, mockedSavePending],
    },
  }).forEach(settings =>
    matchSnapshot(ChangeCard, {
      ...settings,
      provide: { ...useMockedApollo() },
    }),
  )
})
