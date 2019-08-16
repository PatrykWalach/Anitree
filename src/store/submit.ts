import { value as binding, plugin, computed } from 'vue-function-api'
import Vue from 'vue'
Vue.use(plugin)

const stored: string | null = localStorage.getItem('SUBMIT')

const _auto = binding(stored === 'true' || false)

const CHANGE_AUTO = (payload: boolean) => {
  _auto.value = payload
}

const auto = computed(() => _auto.value, CHANGE_AUTO)

export default function useSubmit() {
  return {
    _auto,
    auto,
    CHANGE_AUTO
  }
}
