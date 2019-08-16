<template>
  <v-card-actions v-if="!media">
    <MediaCardProgress
      v-for="i in 5"
      :key="i"
      :style="{
        'margin-right': '.2em'
      }"
    />
  </v-card-actions>
  <MediaCardActionsReady v-else :media="media" />
</template>
<script lang="ts">
import MediaCardProgress from './MediaCardProgress.vue'
import MediaCardActionsReady from './MediaCardActionsReady.vue'
import { Media } from '../apollo/schema/media'
import { createComponent } from 'vue-function-api'
interface Props {
  media: Media | null
}
export default createComponent({
  components: { MediaCardProgress, MediaCardActionsReady },
  props: ({ media: { required: true } } as unknown) as Readonly<Props>
})
</script>
