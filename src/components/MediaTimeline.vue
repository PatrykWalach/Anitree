<template>
  <v-row justify="center" align="center">
    <v-col cols="12" v-if="!$vuetify.breakpoint.xsOnly">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <MediaTimelineItem
          v-for="media in mediaList"
          :key="media.id"
          :media="media"
        />
      </v-timeline>
    </v-col>

    <template v-else>
      <v-col cols="12" v-for="media in mediaList" :key="media.id">
        <MediaCard :id="media.id" />
      </v-col>
    </template>

    <slot></slot>
  </v-row>
</template>

<script lang="ts">
import MediaTimelineItem from './MediaTimelineItem.vue'
import MediaCard from './MediaCard.vue'
import { Media } from '@/graphql/schema/media'

export interface Props {
  mediaList: Media[]
}

export default {
  components: {
    MediaTimelineItem,
    MediaCard
  },
  props: {
    mediaList: { required: true, type: Array, default: () => [] }
  }
}
</script>
