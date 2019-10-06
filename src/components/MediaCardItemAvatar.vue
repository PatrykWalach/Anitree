<template>
  <v-list-item-avatar :size="size" :style="{ 'align-self': 'center' }">
    <base-lazy-img :srcset="srcset" :src="src">
      <template v-slot:placeholder>
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </template>
    </base-lazy-img>
  </v-list-item-avatar>
</template>

<script lang="ts">
import BaseLazyImg from './BaseLazyImg.vue'
import { Media } from '@/graphql/schema/media'

import { computed, createComponent } from '@vue/composition-api'
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
  setup(props) {
    const srcset = computed(
      () =>
        (props.media &&
          `${props.media.coverImage.medium} 1x, 
            ${props.media.coverImage.large} 2x, 
            ${props.media.coverImage.extraLarge} 3x`) ||
        '',
    )

    const src = computed(
      () => (props.media && props.media.coverImage.extraLarge) || '',
    )

    return { src, srcset }
  },
})
</script>
