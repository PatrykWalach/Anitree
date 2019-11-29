<template>
  <v-list-item-title :title="title" class="headline">
    {{ title }}
  </v-list-item-title>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'

export interface Props {
  media: Media
}

import { useTitle } from '@/store'

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const { getTitle } = useTitle()

    const title = computed(() => getTitle(props.media.title))

    return {
      title,
    }
  },
})
</script>
