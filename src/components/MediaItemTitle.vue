<template>
  <v-list-item-title :title="title" :class="{ headline }">
    {{ title }}
  </v-list-item-title>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { MediaItemTitle_media } from './__generated__/MediaItemTitle_media'
import { useTitle } from '@/hooks/results'

export interface Props {
  media: MediaItemTitle_media
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
    headline: { default: false, required: false, type: Boolean },
  },
  setup(props) {
    const title = useTitle(() => props.media)

    return {
      title,
    }
  },
})
</script>
