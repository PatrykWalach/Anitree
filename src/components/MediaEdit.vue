<template>
  <ApolloQuery
    v-slot="{ result: { error, data }, isLoading }"
    :query="require('@/graphql/queries/Media.gql')"
    fetch-policy="cache-and-network"
    :variables="{
      id: id || 1,
      format: (Viewer && Viewer.mediaListOptions.scoreFormat) || undefined
    }"
    :skip="!id"
    :tag="null"
  >
    <v-dialog
      :style="{ position: 'absolute', top: 0, right: 0 }"
      v-model="isEdited"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="720px"
    >
      <v-card :loading="loading">
        <v-card-text class="pa-0">
          <media-card-banner :media="data && data.Media">
            <v-overlay absolute></v-overlay>
          </media-card-banner>
          <MediaCardItem :media="data && data.Media" />
          <v-divider></v-divider>
          <MediaEditTabs
            :loading="$apollo.loading || !!isLoading"
            :error="!!$apollo.error || !!error"
          />

          <v-container v-if="$apollo.loading || isLoading">
            <v-row justify="center" align="center">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
          </v-container>

          <MediaEditItems
            v-else-if="data && data.Media && Viewer"
            :media="data && data.Media"
            :user="Viewer"
          />

          <v-list v-else subheader>
            <v-subheader>
              <template v-if="!token">
                Please log in
              </template>
              <template v-else>
                Please try to refresh the page
              </template>
            </v-subheader>
            <TheSettingsLogin v-if="!token" />
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <MediaEditActions :media="data && data.Media" :user="Viewer" />
      </v-card>
    </v-dialog>
  </ApolloQuery>
</template>
<script lang="ts">
import MediaEditActions from './MediaEditActions.vue'
import MediaEditItems from './MediaEditItems.vue'

import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaEditTabs from './MediaEditTabs.vue'

import { VIEWER } from '@/graphql'

import { createComponent, computed } from '@vue/composition-api'
import useEdit from '../store/edit'
import useSettings from '../store/settings'

export interface Props {
  id: number | null
}

export default createComponent<Readonly<Props>>({
  props: {
    id: { required: true, type: null, default: null }
  },
  components: {
    MediaEditTabs,
    MediaEditActions,
    MediaCardBanner,
    MediaCardItem,
    MediaEditItems
  },
  setup() {
    const { close, isEdited: _isEdited, loading } = useEdit()

    const isEdited = computed({
      get: () => _isEdited.value,
      set: isEdited => {
        if (!isEdited) {
          close()
        } else {
          _isEdited.value = isEdited
        }
      }
    })

    return {
      loading,
      close,
      isEdited
    }
  },
  apollo: {
    Viewer: {
      query: VIEWER,
      skip() {
        return !useSettings().token.value
      }
    }
  }
})
</script>
