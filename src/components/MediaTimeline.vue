<template>
  <v-layout column justify-center>
    <v-flex xs12 v-if="!$vuetify.breakpoint.xsOnly">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <MediaTimelineItem
          v-for="media in mediaList"
          :key="media.id"
          :media="media"
        />
      </v-timeline>
    </v-flex>

    <template v-else>
      <v-flex xs12 v-for="media in mediaList" :key="media.id">
        <MediaCard :id="media.id" />
      </v-flex>
    </template>

    <slot></slot>
  </v-layout>
</template>

<script lang="ts">
import MediaTimelineItem from './MediaTimelineItem.vue'
import MediaCard from './MediaCard.vue'
import { Media } from '../apollo/schema/media'
import { createComponent } from 'vue-function-api'

interface Props {
  mediaList: Media[]
}

export default createComponent({
  components: {
    MediaTimelineItem,
    MediaCard
  },
  props: {
    mediaList: { required: true }
  }
})
</script>
