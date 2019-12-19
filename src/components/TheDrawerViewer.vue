<template>
  <components
    :is="$vuetify.breakpoint.xsOnly ? 'v-bottom-sheet' : 'v-menu'"
    :offset-x="!$vuetify.breakpoint.xsOnly || undefined"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-avatar tile size="40">
          <v-img :src="viewer.avatar.large">
            <template v-slot:placeholder>
              <v-skeleton-loader type="image"> </v-skeleton-loader>
            </template>
          </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ viewer.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <template v-if="$vuetify.breakpoint.xsOnly">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="viewer.avatar.large">
              <template v-slot:placeholder>
                <v-skeleton-loader type="image"> </v-skeleton-loader> </template
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ viewer.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <a rel="noopener" target="_blank" :href="viewer.siteUrl">
                Anilist<v-icon small color="primary">open_in_new</v-icon>
              </a>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

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
import { State, useActions } from '@/store'
import { VBottomSheet, VMenu } from 'vuetify/lib'
import { useDispatch, useSelector } from 'vue-redux-hooks'
import { User } from '../graphql/schema/viewer'
import { createComponent } from '@vue/composition-api'

export interface Props {
  viewer: User
}
export default createComponent<Readonly<Props>>({
  components: {
    VBottomSheet,
    VMenu,
  },
  props: {
    viewer: { default: null, required: true, type: Object },
  },
  setup() {
    const dispatch = useDispatch()

    const {
      settings: { CHANGE_TOKEN },
    } = useActions()

    const logout = () => {
      dispatch(CHANGE_TOKEN(null))
    }

    const token = useSelector((state: State) => state.settings.token)

    return { logout, token }
  },
})
</script>
