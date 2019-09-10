<template>
  <MediaCardItemOverlineReady v-if="media" :media="media" />

  <div v-else class="overline">
    <MediaCardProgress width="25%" />
  </div>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import MediaCardItemOverlineReady from './MediaCardItemOverlineReady.vue'

import MediaCardProgress from './MediaCardProgress.vue'
import { createComponent } from '@vue/composition-api'
export interface Props {
  media: Media | null
}
export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemOverlineReady,
    MediaCardProgress,
  },
  props: { media: { default: null, required: true, type: null } },
})
</script>
