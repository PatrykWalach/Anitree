<template>
  <VCard>
    <MediaCardBanner v-if="media.bannerImage" :media="media" />
    <MediaItem :media="media" />
    <VDivider class="mx-4" />

    <MediaCardActions :media="media" />

    <MediaCardStatus :media="media" />
  </VCard>
</template>
<script lang="ts">
import MediaCardActions from './MediaCardActions.vue'

import MediaItem from './MediaItem.vue'
import MediaCardLoadingBanner from './MediaCardLoadingBanner.vue'
import MediaCardStatus from './MediaCardStatus.vue'
import { MediaCard_media } from './__generated__/MediaCard_media'
import { asyncComponent } from '@/router'
import { defineComponent } from '@vue/composition-api'

const MediaCardBanner = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaCardBanner" */ /* webpackPrefetch: true */ './MediaCardBanner.vue'
    ),
    MediaCardLoadingBanner,
  )

export interface Props {
  media: MediaCard_media
}

import { MediaCardActionsFragments } from './MediaCardActions.vue'
import { MediaCardBannerFragments } from './MediaCardBanner.vue'
import { MediaItemFragments } from './MediaItem.vue'
import { MediaCardStatusFragments } from './MediaCardStatus.vue'

import gql from 'graphql-tag'

export const MediaCardFragments = {
  media: gql`
    fragment MediaCard_media on Media {
      id
      bannerImage
      ...MediaItem_media
      ...MediaCardActions_media
      ...MediaCardBanner_media
      ...MediaCardStatus_media
    }
    ${MediaItemFragments.media}
    ${MediaCardActionsFragments.media}
    ${MediaCardBannerFragments.media}
    ${MediaCardStatusFragments.media}
  `,
}

export default defineComponent<Readonly<Props>>({
  components: {
    MediaCardActions,
    MediaCardBanner,
    MediaItem,
    MediaCardStatus,
  },
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
  },
})
</script>
