<template>
  <VListItemSubtitle class="text-capitalize">
    <span v-html="media.description" />
  </VListItemSubtitle>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { MediaItemDescription_media } from './__generated__/MediaItemDescription_media'

import gql from 'graphql-tag'

export const MediaItemDescriptionFragments = {
  media: gql`
    fragment MediaItemDescription_media on Media {
      id
      description
    }
  `,
}

export interface Props {
  media: MediaItemDescription_media
}

export default defineComponent<Readonly<Props>>({
  props: {
    media: { default: null, required: true, type: Object },
  },
})
</script>
