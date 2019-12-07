import BaseField from '@/components/BaseField.vue'

import { matchSnapshot } from './utils'

describe('BaseField', () => {
  matchSnapshot(BaseField, {
    propsData: {
      value: '',
    },
    stubs: {
      VTextField: '<input/>',
    },
  })
})
