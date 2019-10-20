<template>
  <BaseQuery
    :apollo="{
      Viewer,
      Media: ({ Viewer }) => ({
        ...Media,
        variables: {
          ...variables,
          format: (Viewer && Viewer.mediaListOptions.scoreFormat) || undefined,
        },
        tag: null,
      }),
    }"
    v-slot="{ Viewer, Media, isLoading, errors }"
  >
    <v-dialog
      v-model="isEdited"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="720px"
    >
      <v-card :loading="loading">
        <v-card-text class="pa-0">
          <media-card-banner :media="Media">
            <v-overlay absolute></v-overlay>
          </media-card-banner>

          <MediaCardItem :media="Media" />
          <v-divider></v-divider>

          <MediaEditTabs
            :loading="
              !!isLoading.Viewer ||
                !!isLoading.Media ||
                !!errors.Viewer ||
                !!errors.Media
            "
          />

          <v-container v-if="isLoading.Viewer || isLoading.Media" fill-height>
            <v-row justify="center" align="center">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
          </v-container>

          <MediaEditItems
            v-else-if="Media && Viewer"
            :media="Media"
            :user="Viewer"
          />
          <v-list v-else subheader>
            <v-subheader>
              <template v-if="!token">
                Please log in
              </template>
              <template v-else>
                Connect to the internet
                <p>You're offline Chek your connection.</p>
                <v-btn @click="queries.Media.refetch()" text color="primary"
                  >retry</v-btn
                >
              </template>
            </v-subheader>
            <TheSettingsLogin v-if="!token" />
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <MediaEditActions :media="Media" :user="Viewer" />
      </v-card>
    </v-dialog>
  </BaseQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

import BaseQuery from './BaseQuery.vue'
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaEditActions from './MediaEditActions.vue'
import MediaEditItems from './MediaEditItems.vue'

import MediaEditTabs from './MediaEditTabs.vue'
import { useMedia } from '@/graphql'

export interface Props {
  id: number | null
}
import { useViewer } from '@/graphql'
export default createComponent<Readonly<Props>>({
  components: {
    BaseQuery,
    MediaCardBanner,
    MediaCardItem,
    MediaEditActions,
    MediaEditItems,
    MediaEditTabs,
  },
  props: {
    id: { default: null, required: true, type: null },
  },
  setup(props, { root }) {
    const {
      actions: { close },
      state: { isEdited: _isEdited, loading },
      mutations: { CHANGE_IS_EDITED },
    } = root.$modules.edit

    const isEdited = computed({
      get: () => _isEdited.value,
      set: isEdited => {
        if (!isEdited) {
          close()
        } else {
          CHANGE_IS_EDITED(isEdited)
        }
      },
    })

    return {
      close,
      isEdited,
      loading,
      ...useViewer(root),
      ...useMedia(() => ({ id: props.id || 0 })),
    }
  },
})
</script>
