import VueFunctionApi, { ref, Ref } from 'vue-function-api'

import { ShareData } from '@/types'
import Vue from 'vue'
Vue.use(VueFunctionApi)

const options: Ref<ShareData | null> = ref(null)

const isShared = ref(false)

export default function useShare() {
  return {
    options,
    isShared
  }
}
