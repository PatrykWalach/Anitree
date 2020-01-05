<template>
  <div class="overline text-truncate">
    <span v-for="{ id, name } in media.studios.nodes" :key="id" class="mr-2"
      >{{ name }}
    </span>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { MediaCardItemOverline_media } from './__generated__/MediaCardItemOverline_media'

export interface Props {
  media: MediaCardItemOverline_media
}
export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
})
</script>
