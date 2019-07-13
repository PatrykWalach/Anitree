<template>
  <v-list-item
    :style="{ 'flex-wrap': 'wrap' }"
    :class="{ 'text-xs-left': true }"
    three-line
  >
    <MediaCardItemAvatar :media="media" />
    <v-list-item-content
      :style="{
        'min-width': '100px'
      }"
    >
      <MediaCardItemSeason
        v-if="media.season || media.seasonInt"
        :media="media"
      />
      <MediaCardItemTitle :hover="hover" :media="media" />
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
import MediaCardItemAvatar from './MediaCardItemAvatar.vue'

const MediaCardItemSeason = () => import('./MediaCardItemSeason.vue')
const MediaCardItemDescription = () => import('./MediaCardItemDescription.vue')

@Component({
  components: {
    MediaCardItemDescription,
    MediaCardItemTitle,
    MediaCardItemSubheading,
    MediaCardItemSeason,
    MediaCardItemAvatar
  }
})
export default class MediaCardItem extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  @Prop({ default: true })
  readonly hover!: boolean

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }
}
</script>
