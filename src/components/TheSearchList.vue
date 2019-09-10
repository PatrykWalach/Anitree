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
              v-for="{ to, title, icon } of search"
              :key="title"
              exact
              replace
              :to="to"
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
import { User } from '@/graphql/schema/viewer'
import { createComponent } from '@vue/composition-api'
import useNavigation from '@/store/navigation'

export interface Props {
  user: null | User
}

export default createComponent<Readonly<Props>>({
  props: {
    user: { default: null, required: true, type: null }
  },
  setup() {
    const { search } = useNavigation()
    return { search }
  }
})
</script>
