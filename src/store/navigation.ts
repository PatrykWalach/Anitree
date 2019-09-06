import CompositionApi, { ref, Ref } from '@vue/composition-api'

import Vue from 'vue'
Vue.use(CompositionApi)

export interface Element {
  title: string
  icon: string
  to: string | Location
}

const elements: Ref<Element[]> = ref([
  { title: 'Home', icon: 'home', to: { name: 'home' } },
  { title: 'Changes', icon: 'change_history', to: { name: 'changes' } },
  { title: 'Settings', icon: 'settings', to: { name: 'settings' } }
])

export default function useNavigation() {
  return { elements }
}
