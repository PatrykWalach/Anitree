<template>
  <VListItem selectable :[lines]="true">
    <VListItemContent>
      <MediaItemOverline v-if="media.studios.nodes.length" :media="media" />
      <MediaItemTitle headline :media="media" />
      <MediaItemRatings :media="media" />
      <MediaItemSubtitle body1 :media="media" />
      <MediaItemDescription :media="media" />
    </VListItemContent>
    <MediaItemAvatar :media="media" />
  </VListItem>
</template>

<script lang="ts">
import MediaItemAvatar from './MediaItemAvatar.vue'
import MediaItemDescription from './MediaItemDescription.vue'
import MediaItemRatings from './MediaItemRatings.vue'
import MediaItemSubtitle from './MediaItemSubtitle.vue'
import MediaItemTitle from './MediaItemTitle.vue'
import { computed, defineComponent } from '@vue/composition-api'

import MediaItemLoadingOverline from './MediaItemLoadingOverline.vue'
import { asyncComponent } from '@/router'
import { MediaItem_media } from './__generated__/MediaItem_media'

import { MediaItemAvatarFragments } from './MediaItemAvatar.vue'
import { MediaItemDescriptionFragments } from './MediaItemDescription.vue'
import { MediaItemOverlineFragments } from './MediaItemOverline.vue'
import { MediaItemRatingsFragments } from './MediaItemRatings.vue'
import { MediaItemSubtitleFragments } from './MediaItemSubtitle.vue'
import { MediaItemTitleFragments } from './MediaItemTitle.vue'

import gql from 'graphql-tag'

export const MediaItemFragments = {
  media: gql`
    fragment MediaItem_media on Media {
      id
      description
      ...MediaItemAvatar_media
      ...MediaItemDescription_media
      ...MediaItemOverline_media
      ...MediaItemRatings_media
      ...MediaItemSubtitle_media
      ...MediaItemTitle_media
    }
    ${MediaItemAvatarFragments.media}
    ${MediaItemDescriptionFragments.media}
    ${MediaItemOverlineFragments.media}
    ${MediaItemRatingsFragments.media}
    ${MediaItemSubtitleFragments.media}
    ${MediaItemTitleFragments.media}
  `,
}

const MediaItemOverline = () =>
  asyncComponent(
    import(
      /* webpackChunkName: "MediaItemOverline" */ /* webpackPrefetch: true */ './MediaItemOverline.vue'
    ),
    MediaItemLoadingOverline,
  )

export interface Props {
  media: MediaItem_media
}

export default defineComponent<Readonly<Props>>({
  components: {
    MediaItemAvatar,
    MediaItemDescription,
    MediaItemOverline,
    MediaItemRatings,
    MediaItemSubtitle,
    MediaItemTitle,
  },
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const lines = computed(() => {
      return props.media.description ? 'three-line' : 'two-line'
    })

    return { lines }
  },
})
</script>
