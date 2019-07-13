<template>
  <v-flex xs12>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <MediaTimelineItem
        v-for="media in mediaList"
        :key="media.id"
        :media-id="media.id"
      />
    </v-timeline>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import MediaTimelineItem from './MediaTimelineItem.vue'

import { Media } from '../types'

@Component({
  components: {
    MediaTimelineItem
  }
})
export default class MediaTimeline extends Vue {
  @Prop({ required: true })
  readonly mediaList!: Media[]
}
</script>
