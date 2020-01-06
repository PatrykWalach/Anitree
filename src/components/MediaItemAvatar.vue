<template>
  <v-list-item-avatar v-bind="$attrs" :size="size">
    <MediaCardCover :media="media" />
  </v-list-item-avatar>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { MediaItemAvatar_media } from './__generated__/MediaItemAvatar_media'
import MediaCardCover from './MediaCardCover.vue'

export interface Props {
  media: MediaItemAvatar_media
  size: number | string
}

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  components: { MediaCardCover },
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
    size: {
      default: 80,
      required: false,
      type: [Number, String],
    },
  },
})
</script>
