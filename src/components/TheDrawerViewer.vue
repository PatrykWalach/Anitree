<template>
  <VListGroup :value="true" active-class="accent--text" color="red">
    <template v-slot:activator>
      <VListItemAvatar min-width="32" width="32" height="40">
        <v-img :src="viewer.avatar.large">
          <template v-slot:placeholder>
            <v-skeleton-loader type="image" />
          </template>
        </v-img>
      </VListItemAvatar>
      <VListItemContent>
        <VListItemTitle v-text="viewer.name" />
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
  </VListGroup>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { settingsActions } from '../store/reducers/settings'
import { useDispatch } from 'vue-redux-hooks'
import gql from 'graphql-tag'

export const TheDrawerViewerFragments = {
  viewer: gql`
    fragment TheDrawerViewer_viewer on User {
      id
      name
      avatar {
        large
      }
      siteUrl
    }
  `,
}

export default defineComponent({
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
