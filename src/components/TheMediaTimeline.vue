<template>
  <the-media-timeline-ready v-if="!loading" :media-list="mediaList">
    <slot></slot>
  </the-media-timeline-ready>
  <v-row v-else justify="center" align="center">
    <v-col v-if="!$vuetify.breakpoint.xsOnly" cols="12">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <TheMediaTimelineItem v-for="i in 3" :key="i" :media="null" />
      </v-timeline>
    </v-col>

    <template v-else>
      <v-col v-for="i in 3" :key="i" cols="12">
        <MediaCard />
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import MediaCard from './MediaCard.vue'
import TheMediaTimelineItem from './TheMediaTimelineItem.vue'
import TheMediaTimelineReady from './TheMediaTimelineReady.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  mediaList: Media[] | null
  loading: boolean
}

export default createComponent<Readonly<Props>>({
  components: {
    MediaCard,
    TheMediaTimelineItem,
    TheMediaTimelineReady,
  },
  props: {
    loading: { default: false, required: true, type: Boolean },
    mediaList: { default: () => [], required: true, type: null },
  },
})
</script>
