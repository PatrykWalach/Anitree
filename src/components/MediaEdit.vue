<template>
  <ApolloQuery
    v-slot="{ result: { error, data, loading } }"
    :query="require('@/graphql/queries/Media.gql')"
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
        <MediaEditLoading
          v-if="$apollo.loading || !data"
          :loading="$apollo.loading || loading"
          :error="!!$apollo.error || !!error"
        />
        <v-card-text v-else class="pa-0">
          <media-card-banner :media="data && data.Media">
            <v-overlay absolute></v-overlay>
          </media-card-banner>
          <MediaCardItem :media="data && data.Media" />
          <v-divider></v-divider>
          <MediaEditTabs :media="data && data.Media" :user="Viewer" />
        </v-card-text>
        <v-divider></v-divider>
        <MediaEditActions :media="data && data.Media" :user="Viewer" />
      </v-card>
    </v-dialog>
  </ApolloQuery>
</template>
<script lang="ts">
import MediaEditActions from './MediaEditActions.vue'
import MediaEditLoading from './MediaEditLoading.vue'

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
    MediaEditLoading,
    MediaCardBanner,
    MediaCardItem
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
