<template>
  <v-container>
    <v-row justify="center" align="start">
      <v-col cols="12" md="6">
        <v-card>
          <v-subheader>
            Here are just some of the things you can see
          </v-subheader>
          <v-list>
            <v-list-item
              exact
              replace
              :to="{
                query: {
                  year: 2019,
                  season: 'SUMMER'
                }
              }"
            >
              <v-list-item-icon>
                <v-icon>whatshot</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Current season</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              exact
              replace
              :to="{
                query: {
                  sort: 'ID_DESC'
                }
              }"
            >
              <v-list-item-icon>
                <v-icon>new_releases</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Recently added</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-if="user"
              exact
              replace
              :to="{
                query: {
                  onList: true
                }
              }"
            >
              <v-list-item-icon>
                <v-icon>folder</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>From list</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card></v-col
      >
    </v-row></v-container
  >
</template>

<script lang="ts">
import { User } from '@/graphql/schema/viewer'

export interface Props {
  user: null | User
}

export default {
  props: {
    user: { required: true, type: null, default: null }
  }
}
</script>
