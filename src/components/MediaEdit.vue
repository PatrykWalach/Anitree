<template>
  <BaseQuery
    :apollo="{
      Media: {
        ...Media,
        variables: {
          ...variables,
          format: (viewer && viewer.mediaListOptions.scoreFormat) || undefined,
        },
        tag: null,
      },
    }"
    v-slot="{ Media, isLoading, errors }"
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
            :tab.sync="tab"
            :style="{ position: 'sticky', top: 0, 'z-index': 2 }"
            :loading="!token || !Media || !viewer"
          />
          <v-container v-if="!viewer || isLoading.Media">
            <v-row justify="center" align="center">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
          </v-container>

          <template v-else-if="!token">
            <v-card-title>
              You are not logged in
            </v-card-title>
            <v-card-actions>
              <v-btn
                block
                color="primary"
                rel="noopener"
                :href="
                  `https://anilist.co/api/v2/oauth/authorize?client_id=${appId}&response_type=token`
                "
              >
                Login with Anilist
              </v-btn>
            </v-card-actions>
          </template>
          <MediaEditItems
            v-else-if="Media && viewer"
            :tab.sync="tab"
            :media="Media"
            :user="viewer"
          />
          <template v-else>
            <v-card-title>
              Connect to the internet
            </v-card-title>
            <v-card-text>
              You're offline. Check your connection.
            </v-card-text>
            <v-card-actions>
              <v-btn @click.stop="queries.Media.refetch()" text color="primary"
                >retry</v-btn
              >
            </v-card-actions>
          </template>
        </v-card-text>
        <v-divider></v-divider>
        <MediaEditActions :media="Media" :user="viewer" />
      </v-card>
    </v-dialog>
  </BaseQuery>
</template>
<script lang="ts">
import { computed, createComponent, ref } from '@vue/composition-api'

import BaseQuery from './BaseQuery.vue'
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaEditActions from './MediaEditActions.vue'
const MediaEditItems = () =>
  import(
    /* webpackChunkName: "MediaEditItems" */ /* webpackPrefetch: true */ './MediaEditItems.vue'
  )

import MediaEditTabs from './MediaEditTabs.vue'
import { User } from '../graphql/schema/viewer'
import { useAccount } from './TheSettings.vue'
import { useMedia } from '@/graphql'

import { useViewer } from '@/graphql'
export interface Props {
  id: number | null
  viewer: User | null
}
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
    viewer: { default: null, required: true, type: null },
  },
  setup(props, { root }) {
    const {
      close,
      isEdited: _isEdited,
      loading,
      CHANGE_IS_EDITED,
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
    const { id: appId } = useAccount(root)

    const tab = ref('edit1')

    return {
      appId,
      close,
      isEdited,
      loading,
      tab,
      ...useViewer(root),
      ...useMedia(() => ({ id: props.id || 0 })),
    }
  },
})
</script>
