import CompositionApi, { ref, Ref } from '@vue/composition-api'
import { Location } from 'vue-router'

import Vue from 'vue'
Vue.use(CompositionApi)

export interface Element {
  title: string
  icon: string
  to: Location // |string
}

const main: Ref<Element[]> = ref([
  { title: 'Home', icon: 'home', to: { name: 'home' } },
  { title: 'Changes', icon: 'change_history', to: { name: 'changes' } },
  { title: 'Settings', icon: 'settings', to: { name: 'settings' } }
])

const search: Ref<Element[]> = ref([
  {
    title: 'Current season',
    icon: 'whatshot',
    to: {
      name: 'search',
      query: {
        year: '2019',
        season: 'SUMMER'
      }
    }
  },
  {
    title: 'Recently added',
    icon: 'new_releases',
    to: {
      name: 'search',
      query: {
        sort: 'ID_DESC'
      }
    }
  },
  {
    title: 'From list',
    icon: 'folder',
    to: {
      name: 'search',
      query: {
        onList: true
      }
    }
  }
])

export default function useNavigation() {
  return { main, search }
}
