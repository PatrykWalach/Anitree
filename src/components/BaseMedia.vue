<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.smAndDown && !large"
    :large="!$vuetify.breakpoint.smAndDown && large"
    :color="media.coverImage.color || '#e0e0e0'"
  >
    <template v-slot:opposite>
      <BaseMediaTime :media="media" />
      <v-btn
        :color="media.coverImage.color"
        rel="noopener"
        target="_blank"
        :href="media.siteUrl"
        icon
        flat
      >
        <v-icon>link</v-icon>
      </v-btn>
    </template>

    <v-card :style="style">
      <!-- <div :style="{ flex: 1 }"> -->
      <BaseMediaImage :media="media" />
      <!-- </div> -->
      <div :style="{ flex: 3, display: 'flex', 'flex-direction': 'column' }">
        <BaseMediaTitle :media="media" />
        <template
          v-if="
            media.tags.length ||
              $vuetify.breakpoint.smAndDown ||
              media.studios.nodes.length
          "
        >
          <v-divider></v-divider>
          <BaseMediaActions :media="media" />
        </template>
      </div>
      <BaseMediaStatus
        v-if="media.mediaListEntry"
        :status="media.mediaListEntry.status"
      />
    </v-card>
  </v-timeline-item>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import BaseMediaImage from './BaseMediaImage.vue'
import BaseMediaTitle from './BaseMediaTitle.vue'
import BaseMediaTime from './BaseMediaTime.vue'
// import BaseMediaStatus from './BaseMediaStatus.vue'
import BaseMediaActions from './BaseMediaActions.vue'
import { AMedia } from '../types'

const BaseMediaStatus = () =>
  import(/* webpackPreload: true */ './BaseMediaStatus.vue')

import moduleMedia from '@/store/modules/media'

@Component({
  components: {
    BaseMediaImage,
    BaseMediaTitle,
    BaseMediaTime,
    BaseMediaStatus,
    BaseMediaActions
  }
})
export default class BaseMedia extends Vue {
  @Prop()
  public readonly media!: AMedia

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
      // overflow: 'hidden'
    }
  }
  get large() {
    return !!this.currentId && this.media.id === this.currentId
  }
}
</script>
