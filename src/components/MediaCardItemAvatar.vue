<template>
  <v-list-item-avatar
    :color="color"
    :size="size"
    :style="{ 'align-self': 'center' }"
  >
    <BaseLazyImg
      v-if="media"
      :srcset="
        `${media.coverImage.medium} 1x, 
            ${media.coverImage.large} 2x, 
            ${media.coverImage.extraLarge} 3x`
      "
      :lazy-src="media.coverImage.medium"
      :src="media.coverImage.extraLarge"
    />
  </v-list-item-avatar>
</template>

<script lang="ts">
import BaseLazyImg from './BaseLazyImg.vue'
import { Media } from '@/graphql/schema/media'

import { createComponent } from '@vue/composition-api'
import { useTheme } from './MediaCardProgress.vue'

export interface Props {
  media: Media | null
  size: number | string
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseLazyImg,
  },
  props: {
    media: { default: null, required: true, type: null },
    size: {
      default: 80,
      required: false,
      type: [Number, String],
    },
  },
  setup() {
    return useTheme()
  },
})
</script>
