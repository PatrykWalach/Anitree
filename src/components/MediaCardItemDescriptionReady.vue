<template>
  <v-list-item-subtitle class="text-capitalize">
    <span v-html="media.description"></span>
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import { createComponent } from '@vue/composition-api'
export interface Props {
  media: Media
}
export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
})
</script>
