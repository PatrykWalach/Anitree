import CompositionApi, { Ref, ref } from '@vue/composition-api'
import { Location } from 'vue-router'

import Vue from 'vue'
Vue.use(CompositionApi)

export interface Element {
  title: string
  icon: string
  to: Location // |string
}

const main: Ref<Element[]> = ref([
  { icon: 'home', title: 'Home', to: { name: 'home' } },
  { icon: 'change_history', title: 'Changes', to: { name: 'changes' } },
  { icon: 'settings', title: 'Settings', to: { name: 'settings' } },
])

const search: Ref<Element[]> = ref([
  {
    icon: 'whatshot',
    title: 'Current season',
    to: {
      name: 'search',
      query: {
        season: 'SUMMER',
        year: '2019',
      },
    },
  },
  {
    icon: 'new_releases',
    title: 'Recently added',
    to: {
      name: 'search',
      query: {
        sort: 'ID_DESC',
      },
    },
  },
  {
    icon: 'folder',
    title: 'From list',
    to: {
      name: 'search',
      query: {
        onList: true,
      },
    },
  },
])
const useNavigation = () => {
  return { main, search }
}
export default useNavigation
