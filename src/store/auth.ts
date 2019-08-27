import CompositionApi, { ref, Ref, computed } from '@vue/composition-api'
import Vue from 'vue'
Vue.use(CompositionApi)

const stored = localStorage.getItem('AUTH')

const _token: Ref<string | null> = ref(stored)

const CHANGE_TOKEN = async (payload: string | null) => {
  if (payload) localStorage.setItem('AUTH', payload)
  else localStorage.removeItem('AUTH')

  _token.value = payload
}

const token = computed({
  get: () => _token.value,
  set: CHANGE_TOKEN
})

export default function useAuth() {
  return { _token, CHANGE_TOKEN, token }
}
