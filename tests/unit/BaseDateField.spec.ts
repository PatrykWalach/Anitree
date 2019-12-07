import BaseDateField from '@/components/BaseDateField.vue'

import { matchSnapshot } from './utils'

describe('BaseDateField', () => {
  matchSnapshot(BaseDateField, {
    propsData: {
      value: '',
    },
  })
})
