<template>
  <v-progress-linear
    v-if="!media"
    :color="color"
    :value="50"
  ></v-progress-linear>
  <MediaCardStatusReady v-else :media="media" />
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import MediaCardStatusReady from './MediaCardStatusReady.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media | null
}

import { useInjectedTheme } from '@/mixins'

export default createComponent<Readonly<Props>>({
  components: {
    MediaCardStatusReady,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
  setup() {
    return useInjectedTheme()
  },
})
</script>
