<template>
  <v-img v-bind="$attrs" :srcset="srcset" :src="src">
    <template v-slot:placeholder>
      <v-skeleton-loader type="image" />
    </template>
    <slot></slot>
  </v-img>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { MediaCardCover_media } from './__generated__/MediaCardCover_media'

import gql from 'graphql-tag'

export const MediaCardCoverFragments = {
  media: gql`
    fragment MediaCardCover_media on Media {
      id
      coverImage {
        medium
        large
        extraLarge
      }
    }
  `,
}

export interface Props {
  media: MediaCardCover_media
  x: number
}

export default defineComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
    x: {
      default: 2,
      required: false,
      type: Number,
    },
  },
  setup(props) {
    const srcset = computed(() => {
      const { coverImage } = props.media
      if (coverImage) {
        const x = props.x
        const { medium, large, extraLarge } = coverImage

        return `${medium} ${x * 0.5}x,
            ${large} ${x}x,
            ${extraLarge} ${x * 1.5}x`
      }
      return ''
    })

    const src = computed(() => props.media.coverImage?.extraLarge || '')

    return { src, srcset }
  },
})
</script>
