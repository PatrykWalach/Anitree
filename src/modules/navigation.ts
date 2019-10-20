import { Module, State } from 'vuex-composition-api'
import { Location } from 'vue-router'

export interface Element {
  title: string
  icon: string
  to: Location // |string
}

export const useNavigation = () =>
  new Module({
    name: 'navigation',
    namespaced: true,
    setup({ state }) {
      const main: State<Element[]> = state([
        { icon: 'home', title: 'Home', to: { name: 'home' } },
        { icon: 'change_history', title: 'Changes', to: { name: 'changes' } },
        { icon: 'settings', title: 'Settings', to: { name: 'settings' } },
      ])

      const search: State<Element[]> = state([
        {
          icon: 'whatshot',
          title: 'Current season',
          to: {
            name: 'search',
            query: {
              season: (() => {
                const date = new Date().getMonth() / 3
                if (date < 1) return 'WINTER'
                if (date < 2) return 'SPRING'
                if (date < 3) return 'SUMMER'
                return 'FALL'
              })(),
              sort: 'POPULARITY_DESC',
              year: new Date().getFullYear().toString(),
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
              onList: 'true',
            },
          },
        },
      ])
      return { state: { main, search } }
    },
  })
