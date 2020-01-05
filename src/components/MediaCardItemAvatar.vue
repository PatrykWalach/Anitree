<template>
  <v-list-item-avatar v-bind="$attrs" :size="size">
    <v-img :srcset="srcset" :src="src">
      <template v-slot:placeholder>
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </template>
    </v-img>
  </v-list-item-avatar>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { MediaCardItemAvatar_media } from './__generated__/MediaCardItemAvatar_media'

export interface Props {
  media: MediaCardItemAvatar_media
  size: number | string
}

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
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
  setup(props) {
    const srcset = computed(() => {
      const { coverImage } = props.media
      if (coverImage) {
        const { medium, large, extraLarge } = coverImage
        return `${medium} 1x,
            ${large} 2x,
            ${extraLarge} 3x`
      }
      return ''
    })

    const src = computed(() => {
      const { coverImage } = props.media
      return (coverImage && coverImage.extraLarge) || ''
    })

    return { src, srcset }
  },
})
</script>
