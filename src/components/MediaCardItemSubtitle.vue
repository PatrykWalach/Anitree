<template>
  <MediaCardItemSubtitleReady v-if="media" :media="media" />
  <v-list-item-subtitle v-else class="text-capitalize">
    <v-skeleton-loader type="text" width="160px" max-width="100%" />
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import MediaCardItemSubtitleReady from './MediaCardItemSubtitleReady.vue'

import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media | null
}
export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemSubtitleReady,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
})
</script>
