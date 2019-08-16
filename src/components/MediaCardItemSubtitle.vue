<template>
  <MediaCardItemSubtitleReady v-if="media" :media="media" />

  <v-list-item-subtitle v-else class="text-capitalize">
    <MediaCardProgress
      width="50%"
      :style="{
        'margin-bottom': '.2em'
      }"
    />
    <MediaCardProgress
      v-for="i in 2"
      :key="i"
      :style="{
        'margin-bottom': '.2em'
      }"
    />
  </v-list-item-subtitle>
</template>

<script lang="ts">
import MediaCardItemSubtitleReady from './MediaCardItemSubtitleReady.vue'

import MediaCardProgress from './MediaCardProgress.vue'
import { Media } from '../apollo/schema/media'
import { createComponent } from 'vue-function-api'
interface Props {
  media: Media | null
}
export default createComponent({
  components: {
    MediaCardItemSubtitleReady,

    MediaCardProgress
  },
  props: {
    media: { required: true }
  }
})
</script>
