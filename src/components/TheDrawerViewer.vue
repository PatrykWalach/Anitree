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
      <VListItemContent>
        <VListItemTitle>
          {{ viewer.name }}
        </VListItemTitle>
      </VListItemContent>
    </template>

    <VListItem rel="noopener" :href="`${viewer.siteUrl}/animelist`">
      <VListItemIcon>
        <VIcon>movie</VIcon>
      </VListItemIcon>
      <VListItemContent>
        <VListItemTitle>
          Anime List
        </VListItemTitle>
      </VListItemContent>
    </VListItem>

    <VListItem rel="noopener" :href="`${viewer.siteUrl}/mangalist`">
      <VListItemIcon>
        <VIcon>menu_book</VIcon>
      </VListItemIcon>
      <VListItemContent>
        <VListItemTitle>
          Manga List
        </VListItemTitle>
      </VListItemContent>
    </VListItem>

    <VListItem @click.stop="logout">
      <VListItemIcon>
        <VIcon>exit_to_app</VIcon>
      </VListItemIcon>
      <VListItemContent>
        <VListItemTitle>
          Logout
        </VListItemTitle>
      </VListItemContent>
    </VListItem>
    <!-- <VDivider></VDivider> -->
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
