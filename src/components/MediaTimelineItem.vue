<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.smAndDown && !large"
    :large="!$vuetify.breakpoint.smAndDown && large"
    :color="color"
  >
    <template v-slot:opposite>
      <MediaCardTime :media="media" />
    </template>
    <!-- <div :style="{ display: 'flex' }"> -->
    <MediaCard :media="media" />
    <!-- </div> -->
  </v-timeline-item>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

import MediaCardTime from './MediaCardTime.vue'

import MediaCard from './MediaCard.vue'
import moduleMedia from '../store/modules/media'
import media from '../store/modules/media'

@Component({
  components: {
    MediaCardTime,
    MediaCard
  }
})
export default class MediaTimelineItem extends Vue {
  @Prop({ required: true })
  public readonly mediaId!: number

  get media() {
    return media.media[this.mediaId]
  }

  get color() {
    return (
      this.media.coverImage.color ||
      (this.$vuetify.theme.dark ? '#555' : '#e0e0e0')
    )
  }

  get currentId() {
    return moduleMedia.currentId
  }

  get large() {
    return !!this.currentId && this.media.id === this.currentId
  }
}
</script>
