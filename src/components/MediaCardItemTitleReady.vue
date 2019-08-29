<template>
  <span v-if="hover" v-on="hover.on" v-bind="hover.attrs">
    <router-link
      :to="{
        name: 'media',
        params
      }"
    >
      {{ title }}
    </router-link>
  </span>
  <router-link
    v-else
    :to="{
      name: 'media',
      params
    }"
  >
    {{ title }}
  </router-link>
</template>

<script lang="ts">
import { Media } from '@/graphql/schema/media'

import { createComponent, computed } from '@vue/composition-api'

import useTitle from '@/store/title'
import { Tooltip } from '../types'

export interface Props {
  media: Media
  hover: Tooltip | null
}

export default createComponent<Readonly<Props>>({
  props: {
    media: { required: true, default: Object, type: null },
    hover: { required: false, default: null, type: null }
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
      title,
      params
    }
  }
})
</script>
