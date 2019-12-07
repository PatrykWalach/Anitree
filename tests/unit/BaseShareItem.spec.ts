import BaseShareItem from '@/components/BaseShareItem.vue'

import { matchSnapshot } from './utils'

describe('BaseShareItem', () => {
  matchSnapshot(BaseShareItem, {
    propsData: {
      href: '',
      options: null,
      title: '',
    },
  })
})
