<template>
  <v-img
    :src="media.bannerImage"
    v-bind="$attrs"
    min-width="100%"
    :aspect-ratio="500 / 150"
  >
    <template v-slot:placeholder>
      <v-skeleton-loader tile type="image" class="loader" />
    </template>
    <slot />
  </v-img>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { MediaCardBanner_media } from './__generated__/MediaCardBanner_media'

import gql from 'graphql-tag'

export const MediaCardBannerFragments = {
  media: gql`
    fragment MediaCardBanner_media on Media {
      id
      bannerImage
    }
  `,
}

export interface Props {
  media: MediaCardBanner_media
}

export default defineComponent<Readonly<Props>>({
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
  },
})
</script>
<style lang="scss">
.loader {
  height: 100%;
}
.loader > .v-skeleton-loader__image.v-skeleton-loader__bone {
  height: 100%;
}
</style>
