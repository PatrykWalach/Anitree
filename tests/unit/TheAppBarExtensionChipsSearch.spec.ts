import TheAppBarExtensionChipsSearch from '@/components/TheAppBarExtensionChipsSearch.vue'

import { matchSnapshot } from './utils'
import { useMockedStore } from './mocks/store'

describe('TheAppBarExtensionChipsSearch', () => {
  matchSnapshot(TheAppBarExtensionChipsSearch, useMockedStore())
})
