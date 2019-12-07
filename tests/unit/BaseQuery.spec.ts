import BaseQuery from '@/components/BaseQuery.vue'
import { VIEWER } from '@/graphql'
import { matchSnapshot } from './utils'

describe('BaseQuery', () => {
  matchSnapshot(BaseQuery, {
    propsData: {
      apollo: { query: VIEWER },
    },
    scopedSlots: {
      default: '<div></div>',
    },
  })
})
