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
      <MediaCardItemMenu :hover="hover" :media="media" />
      <MediaCardItemSeason
      
        :media="media"
      />
      <MediaCardItemTitle :media="media" />
      <MediaCardItemSubheading :media="media" />
      <MediaCardItemDescription :media="media" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

import MediaCardItemTitle from './MediaCardItemTitle.vue'
import MediaCardItemSubheading from './MediaCardItemSubheading.vue'
import MediaCardItemAvatar from './MediaCardItemAvatar.vue'
import MediaCardItemMenu from './MediaCardItemMenu.vue'
import MediaCardItemSeason from './MediaCardItemSeason.vue'
import MediaCardItemDescription from './MediaCardItemDescription.vue'



@Component({
  components: {
    MediaCardItemDescription,
    MediaCardItemTitle,
    MediaCardItemSubheading,
    MediaCardItemSeason,
    MediaCardItemAvatar,
    MediaCardItemMenu
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
