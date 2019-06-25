<template>
  <v-layout row wrap align-center :style="{ flex: 0 }">
    <base-chip
      label
      small
      :color="media.coverImage.color"
      v-for="tag in tags"
      :key="`tag-${tag.id}`"
      >{{ tag.name.toLowerCase() }}</base-chip
    >

    <v-btn
      icon
      small
      flat
      :color="media.coverImage.color"
      rel="noopener"
      target="_blank"
      :href="media.siteUrl"
      v-if="$vuetify.breakpoint.xsOnly"
    >
      <v-icon>link</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <BaseMediaTime v-if="$vuetify.breakpoint.xsOnly" :media="media" />
    <v-chip
      small
      outline
      label
      v-for="studio in media.studios.nodes"
      :key="`studio-${studio.id}`"
      >{{ studio.name }}</v-chip
    >
  </v-layout>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import BaseChip from './BaseChip.vue'
import { AMedia } from '../types'
import BaseMediaTime from './BaseMediaTime.vue'

@Component({ components: { BaseChip, BaseMediaTime } })
export default class BaseMediaTitleTags extends Vue {
  @Prop()
  public readonly media!: AMedia
  get tags() {
    return this.media.tags
      .filter(({ rank }) => rank >= this.medianRank)
      .slice(0, 5)
  }

  get medianRank() {
    const tags = this.media.tags.map(({ rank }) => rank)
    const mid = Math.floor(tags.length / 2)
    return this.media.tags.length % 2
      ? tags[mid]
      : (tags[mid - 1] + tags[mid]) / 2
  }
}
</script>
