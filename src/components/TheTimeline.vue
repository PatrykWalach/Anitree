<template>
  <v-row justify="center" align="center" dense>
    <v-col v-if="!$vuetify.breakpoint.xsOnly" cols="12">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <the-timeline-item
          v-for="media in mediaList"
          :key="media.id"
          :media="media"
        />
      </v-timeline>
    </v-col>

    <template v-else>
      <v-col v-for="media in mediaList" :key="media.id" cols="12">
        <media-card :media="media" />
      </v-col>
    </template>

    <slot v-bind="{ showingEverything, increaseShowing }" />
  </v-row>
</template>

<script lang="ts">
import MediaCard from './MediaCard.vue'
import TheTimelineItem from './TheTimelineItem.vue'

import { TheTimeline_media } from './__generated__/TheTimeline_media'
import { useShow } from './TheGrid.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  media: TheTimeline_media[]
  show: number
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCard,
    TheTimelineItem,
  },
  props: {
    media: { default: null, required: true, type: Array },
    show: { default: 6, required: false, type: Number },
  },
  setup(props) {
    return useShow(props)
  },
})
</script>
