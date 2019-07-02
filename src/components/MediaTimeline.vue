<template>
  <v-flex>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <MediaCard v-for="media in mediaList" :key="media.id" :media="media" />
    </v-timeline>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import MediaCard from './MediaCard.vue'

import { Media } from '../types'

@Component({
  components: {
    MediaCard
  }
})
export default class MediaTimeline extends Vue {
  @Prop({ required: true })
  public readonly mediaList!: Media[]
}
</script>
