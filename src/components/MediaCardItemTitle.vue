<template>
  <!-- <v-skeleton-loader max-width="100px" :loading="!media" type="text">
    <MediaCardItemTitleReady :media="media" />
  </v-skeleton-loader> -->
  <MediaCardItemTitleReady v-if="media" :media="media" />
  <v-list-item-title v-else class="headline">
    <v-skeleton-loader type="text" width="420px" max-width="100%" />
  </v-list-item-title>
  <!-- <MediaCardItemTitleReady v-if="media" :media="media" />
  <v-list-item-title v-else class="headline">
    <MediaCardProgress width="75%" />
  </v-list-item-title> -->
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import MediaCardItemTitleReady from './MediaCardItemTitleReady.vue'

import MediaCardProgress from './MediaCardProgress.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media | null
}
export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemTitleReady,
    MediaCardProgress,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
})
</script>
