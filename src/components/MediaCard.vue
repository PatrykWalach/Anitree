<template>
  <v-card ripple :style="style">
    <MediaCardImg :media="media" />

    <MediaCardTitle :media="media" />

    <template v-if="media.tags.length || media.studios.nodes.length">
      <v-divider :style="{ 'grid-area': 'divider' }"></v-divider>
      <MediaCardActions :media="media" />
    </template>

    <MediaCardStatus v-if="media.mediaListEntry" :media="media" />
  </v-card>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import MediaCardImg from './MediaCardImg.vue'
// import MediaCardActions from './MediaCardActions.vue'
import MediaCardTitle from './MediaCardTitle.vue'

import { Media } from '../types'
const MediaCardActions = () => import('./MediaCardActions.vue')
const MediaCardStatus = () => import('./MediaCardStatus.vue')

@Component({
  components: {
    MediaCardImg,
    MediaCardTitle,
    MediaCardStatus,
    MediaCardActions
  }
})
export default class MediaCard extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  get style() {
    if (this.banner) {
      return {
        // 'margin-right': '64px',
        grid: `"img" 1fr "title" auto "divider" auto "actions" auto "status" / 1fr`
      }
    }
    const column = this.$vuetify.breakpoint.smAndDown ? '7fr' : '5fr'
    return {
      grid: `"img title" 1fr "img divider" auto "img actions" auto "status status" auto  / 2fr minmax(auto, ${column})`
    }
  }

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }
}
</script>
<style lang="stylus" scoped>
.v-card{
  display: grid;

}
</style>
