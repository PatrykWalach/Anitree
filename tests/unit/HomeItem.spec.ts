import HomeItem from '@/components/HomeItem.vue'

import { matchSnapshot } from './utils'

describe('HomeItem', () => {
  matchSnapshot(HomeItem, {})
})
