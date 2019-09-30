<template>
  <div v-if="media.studios.nodes.length" class="overline text-truncate">
    <span v-for="{ id, name } in media.studios.nodes" :key="id" class="mr-2"
      >{{ name }}
    </span>
  </div>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'
import { createComponent } from '@vue/composition-api'

export interface Props {
  media: Media
}
export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
})
</script>
