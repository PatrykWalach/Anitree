<template>
  <MediaCardCover :x="1" aspect-ratio="1" :media="media">
    <VFadeTransition>
      <div class="fill-height" v-show="hover" :style="{ backgroundImage }" />
    </VFadeTransition>
  </MediaCardCover>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { TheGridCardCover_media } from './__generated__/TheGridCardCover_media'
import MediaCardCover from './MediaCardCover.vue'
import gql from 'graphql-tag'
import { MediaCardCoverFragments } from './MediaCardCover.vue'

export const TheGridCardCoverFragments = {
  media: gql`
    fragment TheGridCardCover_media on Media {
      id
      ...MediaCardCover_media
    }
    ${MediaCardCoverFragments.media}
  `,
}

export interface Props {
  media: TheGridCardCover_media
  hover: boolean
}

export default defineComponent<Readonly<Props>>({
  components: { MediaCardCover },
  setup() {
    const backgroundImage = computed(
      () =>
        `linear-gradient(to top, 
      rgba(0, 0, 0, 0) 75%,
      rgba(0, 0, 0, .5) 100%)
        `,
    )
    return {
      backgroundImage,
    }
  },
  props: {
    hover: { default: false, required: true, type: Boolean },
    media: {
      default: null,
      required: true,
      type: Object,
    },
  },
})
</script>
