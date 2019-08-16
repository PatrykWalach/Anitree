import { value as binding, Wrapper, plugin, computed } from 'vue-function-api'

import { ShareData } from '@/types'
import Vue from 'vue'
Vue.use(plugin)

const _options: Wrapper<ShareData | null> = binding(null)

const _isShared = binding(false)

const CHANGE_OPTIONS = (payload: ShareData | null) => {
  _options.value = payload
}

const CHANGE_IS_SHARED = (payload: boolean) => {
  _isShared.value = payload
}

const isShared = computed(() => _isShared.value, CHANGE_IS_SHARED)
const options = computed(() => _options.value, CHANGE_OPTIONS)

export default function useShare() {
  return {
    _options,
    _isShared,
    options,
    isShared,
    CHANGE_OPTIONS,
    CHANGE_IS_SHARED
  }
}
