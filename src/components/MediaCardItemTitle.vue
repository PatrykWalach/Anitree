<template>
  <v-list-item-title class="headline">
    <MediaCardItemTitleReady v-if="media" :media="media"/>
    <MediaCardProgress v-else width="75%"
  /></v-list-item-title>
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
