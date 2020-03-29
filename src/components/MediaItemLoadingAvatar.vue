<template>
  <VListItemAvatar
    v-bind="$attrs"
    :size="size"
    :style="{ 'align-self': 'center', overflow: 'hidden' }"
  >
    <v-skeleton-loader width="100%" height="100%" type="image" />
  </VListItemAvatar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export interface Props {
  size: number | string
}

export default defineComponent<Readonly<Props>>({
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
