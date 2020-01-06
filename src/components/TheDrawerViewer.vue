<template>
  <v-list-group active-class="accent--text" color="red">
    <template v-slot:activator>
      <v-list-item-avatar min-width="32" width="32" height="40">
        <v-img :src="viewer.avatar.large">
          <template v-slot:placeholder>
            <v-skeleton-loader type="image" />
          </template>
        </v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ viewer.name }}
        </v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item rel="noopener" :href="`${viewer.siteUrl}/animelist`">
      <v-list-item-icon>
        <v-icon>movie</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          Anime List
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item rel="noopener" :href="`${viewer.siteUrl}/mangalist`">
      <v-list-item-icon>
        <v-icon>menu_book</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          Manga List
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

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
    <!-- <v-divider></v-divider> -->
  </v-list-group>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { settingsActions } from '../store/reducers/settings'
import { useDispatch } from 'vue-redux-hooks'

export default createComponent({
  inheritAttrs: false,
  props: {
    viewer: { default: null, required: true, type: Object },
  },
  setup() {
    const dispatch = useDispatch()

    const logout = () => {
      dispatch(settingsActions.CHANGE_TOKEN(null))
    }

    return { logout }
  },
})
</script>
