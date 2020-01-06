<template>
  <media-card-cover :x="1" aspect-ratio="1" :media="media">
    <v-overlay v-if="hover" absolute></v-overlay>
  </media-card-cover>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { TheGridCardCover_media } from './__generated__/TheGridCardCover_media'
import MediaCardCover from './MediaCardCover.vue'

export interface Props {
  media: TheGridCardCover_media

  hover: boolean
}

export default createComponent<Readonly<Props>>({
  components: { MediaCardCover },

  props: {
    hover: { default: false, required: true, type: Boolean },
    media: {
      default: null,
      required: true,
      type: Object,
    },
  },
})
</script>
