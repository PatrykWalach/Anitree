<template>
  <v-list-item-subtitle class="text-capitalize">
    <span v-html="media.description"></span>
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { MediaCardItemDescription_media } from './__generated__/MediaCardItemDescription_media'

export interface Props {
  media: MediaCardItemDescription_media
}


export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },

})
</script>
