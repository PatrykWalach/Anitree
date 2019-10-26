<template>
  <v-container>
    <v-row justify="center" align="start">
      <v-col cols="12" md="6">
        <v-card>
          <v-list subheader>
            <v-subheader>
              Here are just some of the things you can see
            </v-subheader>
            <v-list-item
              v-for="{ bind, title, icon } of search"
              :key="title"
              v-bind="bind"
              replace
            >
              <v-list-item-icon>
                <v-icon>{{ icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row></v-container
  >
</template>

<script lang="ts">
import { NavigationElement } from '../types'
import { User } from '@/graphql/schema/viewer'
import { createComponent } from '@vue/composition-api'

export interface Props {
  user: null | User
}
export const useNavigation = () => {
  const search: NavigationElement[] = [
    {
      bind: {
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
      icon: 'whatshot',
      title: 'Current season',
    },
    {
      bind: {
        to: {
          name: 'search',
          query: {
            sort: 'ID_DESC',
          },
        },
      },
      icon: 'new_releases',
      title: 'Recently added',
    },
    {
      bind: {
        to: {
          name: 'search',
          query: {
            sort: 'TRENDING_DESC',
          },
        },
      },
      icon: 'trending_up',
      title: 'Trending',
    },
  ]
  return { search }
}

export default createComponent<Readonly<Props>>({
  props: {
    user: { default: null, required: true, type: null },
  },
  setup() {
    return useNavigation()
  },
})
</script>
