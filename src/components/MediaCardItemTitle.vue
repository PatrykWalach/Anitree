<template>
  <v-list-item-title class="headline">
    <MediaCardItemTitleReady :hover="hover" v-if="media" :media="media"/>
    <MediaCardProgress v-else width="75%"
  /></v-list-item-title>
</template>

<script lang="ts">
import MediaCardItemTitleReady from './MediaCardItemTitleReady.vue'

import MediaCardProgress from './MediaCardProgress.vue'
import { Media } from '@/graphql/schema/media'
import { createComponent } from '@vue/composition-api'
import { Tooltip } from '../types'
export interface Props {
  media: Media | null
  hover: Tooltip | null
}
export default createComponent<Readonly<Props>>({
  components: {
    MediaCardItemTitleReady,
    MediaCardProgress
  },
  props: {
    media: { required: true, default: null, type: null },
    hover: { required: false, default: null, type: null }
  }
})
</script>
