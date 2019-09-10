import CompositionApi, { Ref, ref } from '@vue/composition-api'

import { ShareData } from '@/types'
import Vue from 'vue'
Vue.use(CompositionApi)

const options: Ref<ShareData | null> = ref(null)

const isShared = ref(false)
export const useShare = () => {
  return {
    isShared,
    options,
  }
}
