<template>
  <v-card-actions :style="{ 'min-width': '100%' }">
    <div :style="{ display: 'flex', 'flex-wrap': 'wrap' }">
      <base-color
        v-for="tag in tags"
        :key="`tag-${tag.id}`"
        small
        label
        link
        :style="{ margin: '4px 8px 4px 0' }"
        :color="media.coverImage.color"
        tag="v-chip"
        :to="{ name: 'search', query: { includedTags: tag.name } }"
      >
        {{ tag.name.toLowerCase() }}
      </base-color>
      <v-chip
        v-for="studio in media.studios.nodes"
        :key="`studio-${studio.id}`"
        small
        outlined
        label
        :style="{ margin: '4px 8px 4px 0' }"
        >{{ studio.name }}</v-chip
      >
    </div>
  </v-card-actions>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import BaseColor from './BaseColor.vue'
import { Media } from '../types'

@Component({ components: { BaseColor } })
export default class MediaCardActions extends Vue {
  @Prop({ required: true })
  readonly media!: Media

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

  // get banner() {
  //   return this.media.bannerImage && !this.$vuetify.breakpoint.smAndDown
  // }
}
</script>
<style lang="scss" scoped>
.v-card__actions {
  display: flex;
  align-items: flex-end;
  grid-area: actions;
}
</style>
