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
import { createComponent } from '@vue/composition-api'
export interface Props {
  media: Media | null
}
export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemOverlineReady,
    MediaCardProgress
  },
  props: { media: { required: true,default:null,type:null } }
})
</script>
