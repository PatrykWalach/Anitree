<template>
  <v-flex>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <MediaTimelineItem
        v-for="media in mediaList"
        :key="media.id"
        :media="media"
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
  public readonly mediaList!: Media[]
}
</script>
