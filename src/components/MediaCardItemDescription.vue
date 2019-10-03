<template>
  <MediaCardItemDescriptionReady v-if="media" :media="media" />
  <v-list-item-subtitle v-else class="text-capitalize">
    <MediaCardProgress
      v-for="i in 2"
      :key="i"
      :style="{
        'margin-bottom': '.2em',
      }"
    />
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import MediaCardItemDescriptionReady from './MediaCardItemDescriptionReady.vue'

import MediaCardProgress from './MediaCardProgress.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media | null
}
export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemDescriptionReady,

    MediaCardProgress,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
})
</script>
