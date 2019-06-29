<template>
  <v-flex>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <BaseMedia v-for="media in mediaList" :key="media.id" :media="media" />
    </v-timeline>
  </v-flex>
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
