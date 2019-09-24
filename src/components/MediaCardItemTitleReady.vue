<template>
  <v-list-item-title :title="title" class="headline">
    {{ title }}
  </v-list-item-title>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'

import { title as titleModule } from '@/store/title'

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const {
      getters: { getTitle },
    } = titleModule

    const title = computed(() => getTitle.value(props.media.title))

    return {
      title,
    }
  },
})
</script>
