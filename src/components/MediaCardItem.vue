<template>
  <v-list-item
    :style="{ flex: 5 }"
    :class="{ 'text-xs-left': true }"
    three-line
  >
    <v-list-item-content :style="{ position: 'relative' }">
      <MediaCardItemSeason
        v-if="media.season || media.seasonInt"
        :media="media"
      />
      <MediaCardItemTitle :media="media" />
      <MediaCardItemSubheading :media="media" />
      <MediaCardItemDescription v-if="media.description" :media="media" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

import MediaCardItemTitle from './MediaCardItemTitle.vue'
import MediaCardItemSubheading from './MediaCardItemSubheading.vue'

const MediaCardItemSeason = () => import('./MediaCardItemSeason.vue')
const MediaCardItemDescription = () => import('./MediaCardItemDescription.vue')

@Component({
  components: {
    MediaCardItemDescription,
    MediaCardItemTitle,
    MediaCardItemSubheading,
    MediaCardItemSeason
  }
})
export default class MediaCardItem extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  width = 100
  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }
}
</script>
