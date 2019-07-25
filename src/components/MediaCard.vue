<template>
  <v-hover>
    <template v-slot="{ hover }">
      <v-card :ripple="!$vuetify.breakpoint.xsOnly">
        <MediaCardBanner :media="media" />
        <media-card-item :media="media">
          <MediaCardItemMenu :hover="hover" :media="media" />
        </media-card-item>

        <v-divider
          v-if="media.tags.length || media.studios.nodes.length"
        ></v-divider>
        <MediaCardActions :media="media" />

        <MediaCardStatus :media="media" />
      </v-card>
    </template>
  </v-hover>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import MediaCardBanner from './MediaCardBanner.vue'
import MediaCardItem from './MediaCardItem.vue'
import MediaCardStatus from './MediaCardStatus.vue'
import MediaCardActions from './MediaCardActions.vue'
import MediaCardItemMenu from './MediaCardItemMenu.vue'

import { Media } from '../types'

@Component({
  components: {
    MediaCardBanner,
    MediaCardItem,
    MediaCardStatus,
    MediaCardActions,
    MediaCardItemMenu
  }
})
export default class MediaCard extends Vue {
  @Prop({ required: true })
  readonly media!: Media
}
</script>
