<template>
  <MediaCardItemOverlineReady v-if="media" :media="media" />

  <div v-else class="overline">
    <MediaCardProgress width="25%" />
  </div>
</template>

<script lang="ts">
import MediaCardItemOverlineReady from './MediaCardItemOverlineReady.vue'

import MediaCardProgress from './MediaCardProgress.vue'
import { Media } from '../apollo/schema/media'
import { createComponent } from 'vue-function-api'
interface Props {
  media: Media | null
}
export default createComponent({
  components: {
    MediaCardItemOverlineReady,
    MediaCardProgress
  },
  props: { media: { required: true } }
})
</script>
