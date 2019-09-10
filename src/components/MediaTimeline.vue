<template>
  <v-row justify="center" align="center">
    <v-col v-if="!$vuetify.breakpoint.xsOnly" cols="12">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <MediaTimelineItem
          v-for="media in mediaList"
          :key="media.id"
          :media="media"
        />
      </v-timeline>
    </v-col>

    <template v-else>
      <v-col v-for="media in mediaList" :key="media.id" cols="12">
        <MediaCard :id="media.id" />
      </v-col>
    </template>

    <slot></slot>
  </v-row>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import MediaCard from './MediaCard.vue'
import MediaTimelineItem from './MediaTimelineItem.vue'

export interface Props {
  mediaList: Media[]
}

export default {
  components: {
    MediaCard,
    MediaTimelineItem
  },
  props: {
    mediaList: { default: () => [], required: true, type: Array }
  }
}
</script>
