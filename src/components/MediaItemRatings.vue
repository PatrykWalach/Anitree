<template>
  <VListItemSubtitle class="text-truncate caption" :style="{ display: 'flex' }">
    <VRating
      readonly
      dense
      half-increments
      color="orange"
      background-color="orange"
      :value="rating"
      class="mr-2"
      size="18"
    />
    <span v-text="more" />
  </VListItemSubtitle>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { MediaItemRatings_media } from './__generated__/MediaItemRatings_media'
import { useNumber } from '@/hooks/intl'
import gql from 'graphql-tag'

export const MediaItemRatingsFragments = {
  media: gql`
    fragment MediaItemRatings_media on Media {
      id
      meanScore
      popularity
    }
  `,
}
export interface Props {
  media: MediaItemRatings_media
}

export default defineComponent<Readonly<Props>>({
  props: {
    media: {
      default: null,
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const meanScore = computed(() => props.media.meanScore || 0)

    const rating = computed(() => Math.round(meanScore.value / 10) / 2)

    const reviews = useNumber(() => props.media.popularity || 0)
    const more = computed(() => `${meanScore.value}% (${reviews.value})`)
    return { more, rating }
  },
})
</script>
