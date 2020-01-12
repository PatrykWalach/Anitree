<template>
  <VListItemSubtitle class="text-capitalize">
    <span v-html="media.description" />
  </VListItemSubtitle>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { MediaItemDescription_media } from './__generated__/MediaItemDescription_media'

export interface Props {
  media: MediaItemDescription_media
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
})
</script>
