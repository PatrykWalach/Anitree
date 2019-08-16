<template>
  <base-lazy-img
    v-if="(!media || media.bannerImage) && !$vuetify.breakpoint.smAndDown"
    :src="(media && media.bannerImage) || ''"
    v-bind="$attrs"
    min-width="100%"
    :aspect-ratio="500 / 150"
  >
    <template v-slot:placeholder>
      <MediaCardProgress height="100%" />
    </template>
    <slot></slot>
  </base-lazy-img>
</template>

<script lang="ts">
import MediaCardProgress from './MediaCardProgress.vue'
import { Media } from '../apollo/schema/media'
import { createComponent } from 'vue-function-api'

const BaseLazyImg = () => import('./BaseLazyImg.vue')
interface Props {
  media: Media | null
}
export default createComponent({
  components: {
    BaseLazyImg,
    MediaCardProgress
  },
  props: {
    media: { required: true }
  }
})
</script>
