<template>
  <VListItemAvatar v-bind="$attrs" :size="size">
    <MediaCardCover :media="media" />
  </VListItemAvatar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { MediaItemAvatar_media } from './__generated__/MediaItemAvatar_media'
import MediaCardCover from './MediaCardCover.vue'

import gql from 'graphql-tag'
import { MediaCardCoverFragments } from './MediaCardCover.vue'

export const MediaItemAvatarFragments = {
  media: gql`
    fragment MediaItemAvatar_media on Media {
      id
      ...MediaCardCover_media
    }
    ${MediaCardCoverFragments.media}
  `,
}

export interface Props {
  media: MediaItemAvatar_media
  size: number | string
}

export default defineComponent<Readonly<Props>>({
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
