<template>
  <div>
    <v-list nav>
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
      <v-divider></v-divider>
    </v-list>
  </div>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { useActions } from '@/store'
import { useDispatch } from 'vue-redux-hooks'

export default createComponent({
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

    return { logout }
  },
})
</script>
