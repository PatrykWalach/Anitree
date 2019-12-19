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
    <slot></slot>
  </v-img>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
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
