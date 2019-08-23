<template>
  <v-progress-linear
    v-if="!media"
    :color="color"
    :value="50"
  ></v-progress-linear>
  <MediaCardStatusReady :media="media" v-else />
</template>

<script lang="ts">
import { Media } from '@/apollo/schema/media'
import { createComponent } from 'vue-function-api'
import MediaCardStatusReady from './MediaCardStatusReady.vue'

interface Props {
  media: Media | null
}

import { useTheme } from './MediaCardProgress.vue'

export default createComponent({
  components: {
    MediaCardStatusReady
  },
  props: {
    media: { required: true }
  },
  setup() {
    return useTheme()
  }
})
</script>
