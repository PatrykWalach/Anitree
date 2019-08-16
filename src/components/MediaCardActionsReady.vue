<template>
  <v-card-actions>
    <div :style="{ display: 'flex', 'flex-wrap': 'wrap' }">
      <base-color
        v-for="tag in tags"
        :key="`tag-${tag.id}`"
        link
        small
        label
        :style="{ margin: '4px 8px 4px 0' }"
        :color="media.coverImage.color || ''"
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
import BaseColor from './BaseColor.vue'

import { Media } from '@/apollo/schema/media'
import { createComponent, computed } from 'vue-function-api'
interface Props {
  media: Media
}
export default createComponent({
  components: { BaseColor },
  props: ({
    media: { required: true }
  } as unknown) as Readonly<Props>,
  setup(props) {
    const medianRank = computed(() => {
      const tags = props.media.tags.map(({ rank }) => rank)
      const mid = Math.floor(tags.length / 2)
      return props.media.tags.length % 2
        ? tags[mid]
        : (tags[mid - 1] + tags[mid]) / 2
    })

    const tags = computed(
      () =>
        props.media.tags
          .filter(({ rank }) => rank >= medianRank.value)
          .slice(0, 5) || []
    )

    return { tags, medianRank }
  }
})
</script>
