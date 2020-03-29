<template>
  <RenderlessTitle :media="media" v-slot="{ title }">
    <VListItemTitle :title="title" :class="{ headline }" v-text="title" />
  </RenderlessTitle>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { MediaItemTitle_media } from './__generated__/MediaItemTitle_media'
import RenderlessTitle from './RenderlessTitle.vue'
import gql from 'graphql-tag'
import { RenderlessTitleFragments } from './RenderlessTitle.vue'

export const MediaItemTitleFragments = {
  media: gql`
    fragment MediaItemTitle_media on Media {
      id
      ...RenderlessTitle_media
    }
    ${RenderlessTitleFragments.media}
  `,
}
export interface Props {
  media: MediaItemTitle_media
}

export default defineComponent<Readonly<Props>>({
  components: { RenderlessTitle },
  props: {
    media: { default: null, required: true, type: Object },
    headline: { default: false, required: false, type: Boolean },
  },
})
</script>
