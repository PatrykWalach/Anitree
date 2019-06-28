<template>
  <v-timeline :dense="$vuetify.breakpoint.smAndDown">
    <BaseMedia
      v-for="media in mediaList"
      :media="media"
      :key="media.id"
      v-show="!media.filtered"
    />
  </v-timeline>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import BaseMedia from './BaseMedia.vue'

import { AMedia } from '../types'

@Component({
  components: {
    BaseMedia
  }
})
export default class MediaTimeline extends Vue {
  // get mediaList() {
  //   return moduleMedia.sortedMedia
  // }

  @Prop()
  public readonly mediaList!: AMedia[]
}
</script>
