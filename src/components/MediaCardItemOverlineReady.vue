<template>
  <div v-if="media.studios.nodes.length" class="overline text-truncate">
    <span
      v-for="{ id, name } in media.studios.nodes"
      :key="id"
      :style="{ margin: '4px 8px 4px 0' }"
      >{{ name }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'

export interface Props {
  media: Media
}
export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
})
</script>
