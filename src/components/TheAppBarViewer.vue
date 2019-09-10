<template>
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
</template>
<script lang="ts">
import { VBottomSheet, VMenu } from 'vuetify/lib'
import { VIEWER } from '@/graphql'
import { createComponent } from '@vue/composition-api'

import { useSettings } from '@/store/settings'

export default createComponent({
  apollo: {
    Viewer: {
      query: VIEWER,
      skip() {
        return !useSettings().token.value
      },
    },
  },
  components: {
    VBottomSheet,
    VMenu,
  },

  setup() {
    const { token } = useSettings()

    const logout = () => {
      token.value = null
    }

    return { logout }
  },
})
</script>
