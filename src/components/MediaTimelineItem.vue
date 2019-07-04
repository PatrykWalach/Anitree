<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.smAndDown && !large"
    :large="!$vuetify.breakpoint.smAndDown && large"
    :color="color"
  >
    <template v-slot:opposite>
      <MediaCardTime :media="media" />
    </template>

    <MediaCard :media="media" />
  </v-timeline-item>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

import MediaCardTime from './MediaCardTime.vue'

import { Media } from '../types'

import MediaCard from './MediaCard.vue'
import moduleMedia from '../store/modules/media'
import theme from '../store/modules/theme'

@Component({
  components: {
    MediaCardTime,

    MediaCard
  }
})
export default class MediaTimelineItem extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  get color() {
    return this.media.coverImage.color || (theme.dark ? '#555' : '#e0e0e0')
  }

  get currentId() {
    return moduleMedia.currentId
  }

  get large() {
    return !!this.currentId && this.media.id === this.currentId
  }
}
</script>
