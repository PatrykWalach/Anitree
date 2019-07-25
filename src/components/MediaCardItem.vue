<template>
  <v-list-item :style="{ 'flex-wrap': 'wrap' }" three-line>
    <MediaCardItemAvatar :media="media" />
    <slot></slot>
    <v-list-item-content
      :style="{
        'min-width': '70%'
      }"
    >
      <MediaCardItemSeason :media="media" />
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
import MediaCardItemSeason from './MediaCardItemSeason.vue'
import MediaCardItemDescription from './MediaCardItemDescription.vue'

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
}
</script>
