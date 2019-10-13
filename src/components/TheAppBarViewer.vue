<template>
  <BaseQuery
    :apollo="{
      Viewer,
    }"
    v-slot="{ Viewer }"
  >
    <components
      :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-menu'"
      v-if="Viewer"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" icon v-on="on">
          <v-avatar
            :size="
              //24
              40
            "
          >
            <v-img :src="Viewer.avatar.large"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="Viewer.avatar.large"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ Viewer.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <a rel="noopener" target="_blank" :href="Viewer.siteUrl">
                Anilist<v-icon small color="primary">open_in_new</v-icon>
              </a>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </components>
  </BaseQuery>
</template>
<script lang="ts">
import { VBottomSheet, VMenu } from 'vuetify/lib'
import BaseQuery from './BaseQuery.vue'
import { createComponent } from '@vue/composition-api'
import { useViewer } from '@/graphql'

export default createComponent({
  components: {
    BaseQuery,
    VBottomSheet,
    VMenu,
  },
  setup(_, { root }) {
    const {
      // state: { token },
      mutations: { CHANGE_TOKEN },
    } = root.$modules.settings

    const logout = () => {
      CHANGE_TOKEN(null)
    }

    return { logout, ...useViewer(root) }
  },
})
</script>
