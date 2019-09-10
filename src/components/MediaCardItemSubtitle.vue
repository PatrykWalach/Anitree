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
import { Media } from '@/graphql/schema/media'
import MediaCardItemSubtitleReady from './MediaCardItemSubtitleReady.vue'

import MediaCardProgress from './MediaCardProgress.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media | null
}
export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemSubtitleReady,

    MediaCardProgress
  },
  props: {
    media: { default: null, required: true, type: null }
  }
})
</script>
