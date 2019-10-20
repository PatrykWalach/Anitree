<template>
  <MediaCardItemTitleReady v-if="media" :media="media" />
  <v-list-item-title v-else class="headline">
    <v-skeleton-loader type="text" width="420px" max-width="100%" />
  </v-list-item-title>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import MediaCardItemTitleReady from './MediaCardItemTitleReady.vue'

import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media | null
}
export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemTitleReady,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
})
</script>
