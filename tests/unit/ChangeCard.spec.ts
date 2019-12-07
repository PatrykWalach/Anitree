import ChangeCard from '@/components/ChangeCard.vue'

import { SaveCommand } from '@/store/modules/commands/SaveCommand'

import { matchSnapshot } from './utils'
import { mockedDollarApollo } from './mocks/apollo'
import { useMockedStore } from './mocks/store'

describe('ChangeCard', () => {
  matchSnapshot(ChangeCard, {
    propsData: {
      command: new SaveCommand({
        apollo: mockedDollarApollo,
        variables: {
          mediaId: 1,
        },
      }),
    },
    ...useMockedStore(),
  })
})
