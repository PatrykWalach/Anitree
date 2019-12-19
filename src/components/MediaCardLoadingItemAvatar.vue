<template>
  <v-list-item-avatar
    v-bind="$attrs"
    :size="size"
    :style="{ 'align-self': 'center', overflow: 'hidden' }"
  >
    <v-skeleton-loader
      width="100%"
      height="100%"
      type="image"
    ></v-skeleton-loader>
  </v-list-item-avatar>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export interface Props {
  size: number | string
}

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    size: {
      default: 80,
      required: false,
      type: [Number, String],
    },
  },
})
</script>
