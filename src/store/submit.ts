import VueFunctionApi, { ref } from 'vue-function-api'
import Vue from 'vue'
Vue.use(VueFunctionApi)

const stored: string | null = localStorage.getItem('SUBMIT')

const auto = ref(stored === 'true' || false)

export default function useSubmit() {
  return {
    auto
  }
}
