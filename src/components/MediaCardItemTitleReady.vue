<template>
  <span v-on="hover.on" v-bind="hover.attrs">
    <router-link
      :to="{
        name: 'media',
        params
      }"
    >
      {{ title }}
    </router-link>
  </span>
</template>

<script lang="ts">
import { Media } from '@/apollo/schema/media'

import { createComponent, computed } from 'vue-function-api'

import useTitle from '@/store/title'

interface Props {
  media: Media
}
export default createComponent({
  props: {
    media: { required: true },
    hover: { required: true }
  },
  setup(props: Readonly<Props>) {
    const { title: _title } = useTitle()

    const title = computed(() => _title.value(props.media.title))

    const params = computed(() => {
      return {
        mediaId: props.media.id,
        mediaType: props.media.type.toLowerCase()
      }
    })

    return {
      title,
      params
    }
  }
})
</script>
