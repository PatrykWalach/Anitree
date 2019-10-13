<template>
  <MediaCardItemDescriptionReady v-if="media" :media="media" />
  <v-list-item-subtitle v-else class="text-capitalize">
    <v-skeleton-loader type="text@2" />
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import MediaCardItemDescriptionReady from './MediaCardItemDescriptionReady.vue'

import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media | null
}
export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemDescriptionReady,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
})
</script>
