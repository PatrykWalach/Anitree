<template>
  <v-list-item-avatar v-bind="$attrs" :size="size">
    <base-lazy-img :srcset="srcset" :src="src">
      <template v-slot:placeholder>
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </template>
    </base-lazy-img>
  </v-list-item-avatar>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import BaseLazyImg from './BaseLazyImg.vue'
import { Media } from '@/graphql/schema/media'

export interface Props {
  media: Media
  size: number | string
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseLazyImg,
  },
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
      const { medium, large, extraLarge } = props.media.coverImage

      return `${medium} 1x, 
            ${large} 2x, 
            ${extraLarge} 3x`
    })

    const src = computed(() => {
      return props.media.coverImage.extraLarge || ''
    })

    return { src, srcset }
  },
})
</script>
