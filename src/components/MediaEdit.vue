<template>
  <ApolloQuery
    v-slot="{ result: { viewerError, data: viewerData }, viewerIsLoading }"
    :query="require('@/graphql/queries/Viewer.gql')"
    :skip="!token"
    :tag="null"
  >
    <ApolloQuery
      v-slot="{ result: { error, data }, isLoading }"
      :query="require('@/graphql/queries/Media.gql')"
      fetch-policy="cache-and-network"
      :variables="{
        id: id || 1,
        format:
          (viewerData && viewerData.Viewer.mediaListOptions.scoreFormat) ||
          undefined,
      }"
      :skip="!id"
      :tag="null"
    >
      <v-dialog
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
              :loading="!!viewerIsLoading || !!isLoading"
              :error="!!viewerError || !!error"
            />

            <v-container v-if="viewerIsLoading || isLoading" fill-height>
              <v-row justify="center" align="center">
                <v-progress-circular indeterminate></v-progress-circular>
              </v-row>
            </v-container>
            <MediaEditItems
              v-else-if="data && viewerData"
              :media="data.Media"
              :user="viewerData.Viewer"
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
          <MediaEditActions
            :media="data && data.Media"
            :user="viewerData && viewerData.Viewer"
          />
        </v-card>
      </v-dialog>
    </ApolloQuery>
  </ApolloQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaEditActions from './MediaEditActions.vue'
import MediaEditItems from './MediaEditItems.vue'

import MediaEditTabs from './MediaEditTabs.vue'

import useEdit from '../store/edit'
import useSettings from '../store/settings'

export interface Props {
  id: number | null
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardBanner,
    MediaCardItem,
    MediaEditActions,
    MediaEditItems,
    MediaEditTabs,
  },
  props: {
    id: { default: null, required: true, type: null },
  },
  setup() {
    const { close, isEdited: _isEdited, loading } = useEdit()
    const { token } = useSettings()

    const isEdited = computed({
      get: () => _isEdited.value,
      set: isEdited => {
        if (!isEdited) {
          close()
        } else {
          _isEdited.value = isEdited
        }
      },
    })

    return {
      close,
      isEdited,
      loading,
      token,
    }
  },
})
</script>
