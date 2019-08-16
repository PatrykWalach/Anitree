<template>
  <v-list-item-avatar
    :color="color"
    :size="size"
    :style="{ 'align-self': 'center' }"
  >
    <base-lazy-img
      v-if="media"
      :srcset="
        `${media.coverImage.medium} 1x, 
            ${media.coverImage.large} 2x, 
            ${media.coverImage.extraLarge} 3x`
      "
      :lazy-src="media.coverImage.medium"
      :src="media.coverImage.extraLarge"
    >
    </base-lazy-img>
  </v-list-item-avatar>
</template>

<script lang="ts">
import { Media } from '@/apollo/schema/media'

import BaseLazyImg from './BaseLazyImg.vue'
import { createComponent, computed, inject, Wrapper } from 'vue-function-api'
import { useTheme } from './MediaCardProgress.vue'

interface Props {
  media: Media | null
  size: number | string
}

export default createComponent({
  components: {
    BaseLazyImg
  },
  props: {
    media: { required: true },
    size: {
      default: 80
    }
  },
  setup() {
    return useTheme()
  }
})
</script>
