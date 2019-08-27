import CompositionApi, { ref } from '@vue/composition-api'
import Vue from 'vue'
Vue.use(CompositionApi)

const stored: string | null = localStorage.getItem('SUBMIT')

const auto = ref(stored === 'true' || false)

export default function useSubmit() {
  return {
    auto
  }
}
