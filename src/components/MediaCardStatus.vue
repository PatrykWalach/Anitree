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
import { createComponent } from '@vue/composition-api'
import MediaCardStatusReady from './MediaCardStatusReady.vue'

export interface Props {
  media: Media | null
}

import { useTheme } from './MediaCardProgress.vue'

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardStatusReady
  },
  props: {
    media: { required: true,type:null,default:null }
  },
  setup() {
    return useTheme()
  }
})
</script>
