import VueFunctionApi, { ref, Ref, computed } from 'vue-function-api'
import Vue from 'vue'
Vue.use(VueFunctionApi)

import { Token } from '@/types'
const stored = localStorage.getItem('AUTH')

const auth: Ref<Token | null> = ref((stored && JSON.parse(stored)) || null)

const token = computed(() => {
  if (
    auth.value
    // && Date.now() < parseInt(auth.value.expires_in)
  ) {
    return auth.value.access_token
  }
  return null
})

const CHANGE_TOKEN = async (payload: Token | null) => {
  if (payload) {
    const newAuth: Token = {
      ...payload,
      /* eslint-disable-next-line @typescript-eslint/camelcase */
      expires_in: (Date.now() + parseInt(payload.expires_in)).toString()
    }
    localStorage.setItem('AUTH', JSON.stringify(newAuth))
    auth.value = newAuth
  } else {
    auth.value = payload
  }
}

export default function useAuth() {
  return { auth, CHANGE_TOKEN, token, stored }
}
