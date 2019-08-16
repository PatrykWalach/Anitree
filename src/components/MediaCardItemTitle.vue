<template>
  <v-list-item-title class="headline">
    <MediaCardItemTitleReady v-if="media" :media="media"/>
    <MediaCardProgress v-else width="75%"
  /></v-list-item-title>
</template>

<script lang="ts">
import MediaCardItemTitleReady from './MediaCardItemTitleReady.vue'

import MediaCardProgress from './MediaCardProgress.vue'
import { Media } from '../apollo/schema/media'
import { createComponent } from 'vue-function-api'
interface Props {
  media: Media | null
}
export default createComponent({
  components: {
    MediaCardItemTitleReady,

    MediaCardProgress
  },
  props: {
    media: { required: true }
  }
})
</script>
