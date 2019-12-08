import BaseLazyImg from '@/components/BaseLazyImg.vue'

import { matchSnapshot } from './utils'

describe('BaseLazyImg', () => {
  matchSnapshot(BaseLazyImg, {
    propsData: {
      src: '',
    },
  })
})
