<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.smAndDown && !large"
    :large="!$vuetify.breakpoint.smAndDown && large"
    :color="color"
  >
    <template v-slot:opposite>
      <MediaCardTime :media="media" />
    </template>

    <v-card ripple :style="{ display: 'flex', 'flex-direction': 'column' }">
      <div :style="style">
        <MediaCardImg :media="media" />

        <div
          :style="{
            flex: 5,
            display: 'flex',
            'flex-direction': 'column'
          }"
        >
          <MediaCardTitle :media="media" />
          <v-divider></v-divider>
        </div>
      </div>

      <template v-if="media.description">
        <MediaCardText :media="media" />
        <v-divider></v-divider>
      </template>

      <MediaCardActions
        v-if="media.tags.length || media.studios.nodes.length"
        :media="media"
      />

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
const MediaCardText = () => import('./MediaCardText.vue')

import moduleMedia from '../store/modules/media'
import theme from '../store/modules/theme'
@Component({
  components: {
    MediaCardText,
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
    return {
      display: 'flex',
      'flex-direction':
        this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
          ? 'column'
          : 'row'
    }
  }
  get large() {
    return !!this.currentId && this.media.id === this.currentId
  }

  // get banner() {
  //   return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  // }
}
</script>
