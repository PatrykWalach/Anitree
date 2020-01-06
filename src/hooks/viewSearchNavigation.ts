import { Location } from 'vue-router'
import { NavigationElement } from '../types'
export const useViewSearchNavigation = () => {
  const elements: NavigationElement<{ to: Location; exact: boolean }>[] = [
    {
      attrs: {
        exact: true,
        to: {
          name: 'search',
          query: {
            season: (() => {
              const months = ['WINTER', 'SPRING', 'SUMMER', 'FALL']
              const date = Math.floor(new Date().getMonth() / 3)
              return months[date]
            })(),
            sort: 'POPULARITY_DESC',
            year: new Date().getFullYear().toString(),
          },
        },
      },
      props: {
        icon: 'whatshot',
        title: 'Current season',
      },
    },
    {
      attrs: {
        exact: true,
        to: {
          name: 'search',
          query: {
            sort: 'ID_DESC',
          },
        },
      },
      props: {
        icon: 'new_releases',
        title: 'Recently added',
      },
    },
    {
      attrs: {
        exact: true,
        to: {
          name: 'search',
          query: {
            sort: 'TRENDING_DESC',
          },
        },
      },
      props: {
        icon: 'trending_up',
        title: 'Trending',
      },
    },
  ]
  return elements
}
