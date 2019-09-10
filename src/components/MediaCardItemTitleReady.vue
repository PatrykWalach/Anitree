<template>
  <router-link
    :title="title"
    :to="{
      name: 'media',
      params
    }"
  >
    {{ title }}
  </router-link>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '@/graphql/schema/media'

import useTitle from '@/store/title'

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { default: Object, required: true, type: null }
  },
  setup(props) {
    const { title: _title } = useTitle()

    const title = computed(() => _title.value(props.media.title))

    const params = computed(() => {
      return {
        mediaId: props.media.id,
        mediaType: props.media.type.toLowerCase()
      }
    })

    return {
      params,
      title
    }
  }
})
</script>
