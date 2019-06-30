<template>
  <v-card-actions>
    <div
      :style="{ display: 'flex', 'align-items': 'center', 'flex-wrap': 'wrap' }"
    >
      <base-color
        v-for="tag in tags"
        :key="`tag-${tag.id}`"
        label
        small
        :color="media.coverImage.color"
        tag="v-chip"
        >{{ tag.name.toLowerCase() }}</base-color
      >

      <v-btn
        v-if="$vuetify.breakpoint.smAndDown"
        icon
        small
        flat
        :color="media.coverImage.color"
        rel="noopener"
        target="_blank"
        :href="media.siteUrl"
      >
        <v-icon>link</v-icon>
      </v-btn>
      <v-chip
        v-for="studio in media.studios.nodes"
        :key="`studio-${studio.id}`"
        small
        outline
        label
        >{{ studio.name }}</v-chip
      >
    </div>
  </v-card-actions>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import BaseColor from './BaseColor.vue'
import { AMedia } from '../types'

@Component({ components: { BaseColor } })
export default class BaseMediaActions extends Vue {
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
