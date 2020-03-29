<template>
  <VHover v-slot="{ hover }">
    <VCard
      exact
      :to="{
        name: 'media',
        params: {
          mediaId: media.id,
          mediaType: media.type.toLowerCase(),
        },
      }"
      flat
      outlined
    >
      <VSheet :style="{ overflow: 'hidden' }">
        <TheGridCardCover :hover="hover" :media="media" />
      </VSheet>

      <VListItem>
        <VListItemContent>
          <MediaItemTitle :media="media" />
          <MediaItemSubtitle :media="media" />
        </VListItemContent>
      </VListItem>
    </VCard>
  </VHover>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TheGridCardCover from './TheGridCardCover.vue'
import MediaItemTitle from './MediaItemTitle.vue'
import MediaItemSubtitle from './MediaItemSubtitle.vue'

import gql from 'graphql-tag'
import { TheGridCardCoverFragments } from './TheGridCardCover.vue'
import { MediaItemTitleFragments } from './MediaItemTitle.vue'
import { MediaItemSubtitleFragments } from './MediaItemSubtitle.vue'

export const TheGridCardFragments = {
  media: gql`
    fragment TheGridCard_media on Media {
      id
      type
      ...TheGridCardCover_media
      ...MediaItemTitle_media
      ...MediaItemSubtitle_media
    }
    ${TheGridCardCoverFragments.media}
    ${MediaItemTitleFragments.media}
    ${MediaItemSubtitleFragments.media}
  `,
}

export default defineComponent({
  props: { media: { default: null, required: true, type: Object } },
  components: {
    TheGridCardCover,
    MediaItemTitle,
    MediaItemSubtitle,
  },
})
</script>
