<template>
  <v-list-item :[lines]="true">
    <MediaCardItemAvatar :media="media" />
    <slot></slot>
    <v-list-item-content>
      <MediaCardItemOverline :media="media" />
      <MediaCardItemTitle :media="media" />
      <MediaCardItemSubtitle :media="media" />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import MediaCardItemTitle from './MediaCardItemTitle.vue'
import MediaCardItemSubtitle from './MediaCardItemSubtitle.vue'
import MediaCardItemAvatar from './MediaCardItemAvatar.vue'
import MediaCardItemOverline from './MediaCardItemOverline.vue'

import MediaCardProgress from './MediaCardProgress.vue'
import { Media } from '../apollo/schema/media'
import { createComponent, computed } from 'vue-function-api'

interface Props {
  media: Media | null
}
export default createComponent({
  components: {
    MediaCardProgress,
    MediaCardItemTitle,
    MediaCardItemSubtitle,
    MediaCardItemOverline,
    MediaCardItemAvatar
  },
  setup(props) {
    const lines = computed(() =>
      !props.media || props.media.description ? 'three-line' : 'two-line'
    )

    return { lines }
  },
  props: ({
    media: { required: true }
  } as unknown) as Readonly<Props>
})
</script>
