<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card ripple>
        <MediaCardBanner :media="media" />
        <MediaCardItem :media="media" :hover="hover" />

        <template v-if="media.tags.length || media.studios.nodes.length">
          <v-divider></v-divider>
          <MediaCardActions :media="media" />
        </template>

        <MediaCardStatus v-if="media.mediaListEntry" :media="media" />
      </v-card>
    </template>
  </v-hover>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import MediaCardBanner from './MediaCardBanner.vue'
// import MediaCardActions from './MediaCardActions.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaCardMenu from './MediaCardMenu.vue'

import { Media } from '../types'
const MediaCardStatus = () => import('./MediaCardStatus.vue')
const MediaCardActions = () => import('./MediaCardActions.vue')

@Component({
  components: {
    MediaCardBanner,
    MediaCardItem,
    MediaCardStatus,
    MediaCardActions,
    MediaCardMenu
  }
})
export default class MediaCard extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  get banner() {
    return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  }
}
</script>
