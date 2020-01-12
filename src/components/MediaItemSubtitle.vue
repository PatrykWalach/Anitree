<template>
  <RenderlessSubtitle :media="media" v-slot="{ subtitle }">
    <VListItemSubtitle
      :class="{ 'text-capitalize': true, 'body-1': body1 }"
      :style="{ alignItems: 'center' }"
      v-text="subtitle"
    />
  </RenderlessSubtitle>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { MediaItemSubtitle_media } from './__generated__/MediaItemSubtitle_media'
import RenderlessSubtitle from './RenderlessSubtitle.vue'

export interface Props {
  media: MediaItemSubtitle_media
}

export default createComponent<Readonly<Props>>({
  components: { RenderlessSubtitle },
  props: {
    media: { default: null, required: true, type: Object },
    body1: { default: false, required: false, type: Boolean },
  },
})
</script>
