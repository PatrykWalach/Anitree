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
import { Media } from '@/apollo/schema/media'

import BaseLazyImg from './BaseLazyImg.vue'
import { createComponent } from '@vue/composition-api'
import { useTheme } from './MediaCardProgress.vue'

export interface Props {
  media: Media | null
  size: number | string
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseLazyImg
  },
  props: {
    media: { required: true,type:null,default:null },
    size: {
      default: 80,type:[Number,String],required:false
    }
  },
  setup() {
    return useTheme()
  }
})
</script>
