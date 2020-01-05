<template>
  <v-list-item-title :title="title" class="headline">
    {{ title }}
  </v-list-item-title>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { MediaCardItemTitle_media } from './__generated__/MediaCardItemTitle_media'
import { useTitle } from '@/hooks/results'

export interface Props {
  media: MediaCardItemTitle_media
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const title = useTitle(() => props.media)

    return {
      title,
    }
  },
})
</script>
