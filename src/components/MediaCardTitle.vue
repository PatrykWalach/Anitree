<template>
  <v-card-title
    :class="{ 'pt-4': banner, 'pl-4': !banner, 'text-xs-left': true }"
  >
    <div
      :style="{
        flex: 1,
        display: 'flex',
        'flex-direction': 'column'
      }"
    >
      <MediaCardTitleTitle :media="media" />
      <MediaCardTitleSubheading :media="media" />
      <MediaCardTitleSeason :media="media" />
    </div>
  </v-card-title>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media } from '../types'

import MediaCardTitleSubheading from './MediaCardTitleSubheading.vue'
import MediaCardTitleTitle from './MediaCardTitleTitle.vue'
import MediaCardTitleSeason from './MediaCardTitleSeason.vue'

@Component({
  components: {
    MediaCardTitleSubheading,
    MediaCardTitleTitle,
    MediaCardTitleSeason
  }
})
export default class MediaCardTitle extends Vue {
  @Prop({ required: true })
  public readonly media!: Media

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }
}
</script>
<style lang="stylus" scoped>

.v-card__title{
  grid-area: title;
  align-items: stretch;
}
</style>
