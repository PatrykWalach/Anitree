<template>
  <components
    v-if="token"
    :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-menu'"
    :offset-y="$vuetify.breakpoint.xsOnly ? undefined : true"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list rounded>
        <v-skeleton-loader type="list-item-avatar" :loading="!viewer">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-avatar>
              <v-avatar :size="40">
                <v-img :src="viewer && viewer.avatar.large"></v-img>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ viewer && viewer.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-skeleton-loader>
      </v-list>
    </template>
    <v-card>
      <template v-if="$vuetify.breakpoint.xsOnly">
        <v-skeleton-loader type="list-item-avatar-two-line" :loading="!viewer">
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="viewer && viewer.avatar.large"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ viewer && viewer.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <a
                  rel="noopener"
                  target="_blank"
                  :href="viewer && viewer.siteUrl"
                >
                  Anilist<v-icon small color="primary">open_in_new</v-icon>
                </a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-skeleton-loader>
        <v-divider></v-divider>
      </template>
      <v-list>
        <v-list-item @click.stop="logout">
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
import { User } from '../graphql/schema/viewer'
import { createComponent } from '@vue/composition-api'

export interface Props {
  viewer: User | null
}
export default createComponent<Readonly<Props>>({
  components: {
    VBottomSheet,
    VMenu,
  },
  props: {
    viewer: { default: null },
  },
  setup(_, { root }) {
    const { CHANGE_TOKEN, token } = root.$modules.settings

    const logout = () => {
      CHANGE_TOKEN(null)
    }

    return { logout, token }
  },
})
</script>
