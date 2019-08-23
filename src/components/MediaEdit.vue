<template>
  <ApolloQuery
    v-slot="{ result: { error, data }, isLoading }"
    :query="require('@/apollo/queries/Media.gql')"
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
          v-if="$apollo.loading || !!isLoading || !!$apollo.error || !!error"
          :loading="$apollo.loading || !!isLoading"
          :error="!!$apollo.error || !!error"
        />
        <v-card-text v-else class="pa-0">
          <media-card-banner :media="data && data.Media">
            <v-overlay absolute></v-overlay>
          </media-card-banner>
          <media-card-item :media="data && data.Media">
            <!-- <MediaEditSync
              :style="{ position: 'absolute', top: 0, right: 0 }"
            /> -->
          </media-card-item>

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

import { VIEWER } from '@/apollo'

import { createComponent, computed } from 'vue-function-api'
import useEdit from '../store/edit'
import useAuth from '../store/auth'

interface Props {
  id: number | null
}

export default createComponent({
  props: {
    id: { required: true }
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
    // Media: {
    //   query: MEDIA,
    //   variables() {
    //     const { Viewer, id } = this
    //     return {
    //       id: id || 1,
    //       format: (Viewer && Viewer.mediaListOptions.scoreFormat) || undefined
    //     }
    //   },
    //   skip() {
    //     return !this.id
    //   }
    // },
    Viewer: {
      query: VIEWER,
      skip() {
        return !useAuth().token.value
      }
    }
  }
})
</script>
