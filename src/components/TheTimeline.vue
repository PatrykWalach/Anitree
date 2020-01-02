<template>
  <v-row justify="center" align="center" dense>
    <v-col v-if="!$vuetify.breakpoint.xsOnly" cols="12">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <TheTimelineItem
          v-for="media in mediaList"
          :key="media.id"
          :media="media"
        />
      </v-timeline>
    </v-col>

    <template v-else>
      <v-col v-for="media in mediaList" :key="media.id" cols="12">
        <MediaCard :media="media" />
      </v-col>
    </template>

    <slot></slot>
  </v-row>
</template>

<script lang="ts">
import MediaCard from './MediaCard.vue'
import TheTimelineItem from './TheTimelineItem.vue'

import { TheTimeline_media } from './__generated__/TheTimeline_media'

export interface Props {
  mediaList: TheTimeline_media[]
}

export default {
  components: {
    MediaCard,
    TheTimelineItem,
  },
  props: {
    mediaList: { default: () => [], required: true, type: Array },
  },
}
</script>
