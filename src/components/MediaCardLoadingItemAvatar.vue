<template>
  <v-list-item-avatar
    v-bind="$attrs"
    :size="size"
    :style="{ 'align-self': 'center' }"
  >
    <base-lazy-img src="">
      <template v-slot:placeholder>
        <v-skeleton-loader type="image"></v-skeleton-loader>
      </template>
    </base-lazy-img>
  </v-list-item-avatar>
</template>

<script lang="ts">
import BaseLazyImg from './BaseLazyImg.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  size: number | string
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseLazyImg,
  },
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
