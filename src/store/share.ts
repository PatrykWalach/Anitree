import CompositionApi, { ref, Ref } from '@vue/composition-api'

import { ShareData } from '@/types'
import Vue from 'vue'
Vue.use(CompositionApi)

const options: Ref<ShareData | null> = ref(null)

const isShared = ref(false)

export default function useShare() {
  return {
    options,
    isShared
  }
}
