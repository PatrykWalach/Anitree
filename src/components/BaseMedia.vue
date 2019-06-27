<template>
  <v-timeline-item
    :small="$vuetify.breakpoint.xsOnly && !large"
    :large="!$vuetify.breakpoint.xsOnly && large"
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

    <v-card :style="{ display: 'flex', 'flex-wrap': 'wrap' }">
      <BaseMediaImage :media="media" />
      <BaseMediaTitle :media="media" />
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
import BaseMediaStatus from './BaseMediaStatus.vue'
import { AMedia } from '../types'

import moduleMedia from '@/store/modules/media'

@Component({
  components: {
    BaseMediaImage,
    BaseMediaTitle,
    BaseMediaTime,
    BaseMediaStatus
  }
})
export default class BaseMedia extends Vue {
  @Prop()
  public readonly media!: AMedia

  get currentId() {
    return moduleMedia.currentId
  }

  get large() {
    return !!this.currentId && this.media.id === this.currentId
  }
}
</script>
