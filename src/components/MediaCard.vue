<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.smAndDown && !large"
    :large="!$vuetify.breakpoint.smAndDown && large"
    :color="color"
  >
    <template v-slot:opposite>
      <MediaCardTime :media="media" />
    </template>

    <v-card ripple :style="style">
      <MediaCardImg :media="media" />

      <MediaCardTitle :media="media" />

      <template v-if="media.tags.length || media.studios.nodes.length">
        <v-divider :style="{ 'grid-area': 'divider' }"></v-divider>
        <MediaCardActions :media="media" />
      </template>

      <MediaCardStatus v-if="media.mediaListEntry" :media="media" />
    </v-card>
  </v-timeline-item>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import MediaCardImg from './MediaCardImg.vue'
// import MediaCardActions from './MediaCardActions.vue'
import MediaCardTitle from './MediaCardTitle.vue'
import MediaCardTime from './MediaCardTime.vue'

import { Media } from '../types'
const MediaCardActions = () => import('./MediaCardActions.vue')
const MediaCardStatus = () => import('./MediaCardStatus.vue')

import moduleMedia from '../store/modules/media'
import theme from '../store/modules/theme'
@Component({
  components: {
    MediaCardImg,
    MediaCardTitle,
    MediaCardTime,
    MediaCardStatus,
    MediaCardActions
  }
})
export default class MediaCard extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  get color() {
    return this.media.coverImage.color || (theme.dark ? '#555' : '#e0e0e0')
  }

  get currentId() {
    return moduleMedia.currentId
  }
  get style() {
    if (this.banner)
      return {
        grid: `"img" 1fr "title" auto "divider" auto "actions" auto "status" / 1fr`
      }
    return undefined
  }
  get large() {
    return !!this.currentId && this.media.id === this.currentId
  }

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }
}
</script>
<style lang="stylus" scoped>
.v-card{
  display: grid;
  grid: "img title" 1fr "img divider" auto "img actions" auto "status status" auto  / 1fr 3fr;
}
</style>
