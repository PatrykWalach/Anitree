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

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props, { root }) {
    const { getTitle } = root.$modules.title

    const title = computed(() => getTitle.value(props.media.title))

    return {
      title,
    }
  },
})
</script>
