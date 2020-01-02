<template>
  <v-list-item-subtitle
    class="text-truncate caption"
    :style="{ display: 'flex' }"
  >
    <v-rating
      readonly
      dense
      half-increments
      color="orange"
      background-color="orange"
      :value="rating"
      class="mr-2"
      size="18"
    ></v-rating>
    <span> {{ meanScore }}% ({{ reviews }}) </span>
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { MediaCardItemRatings_media } from './__generated__/MediaCardItemRatings_media'
import { useNumber } from '@/hooks/intl'

export interface Props {
  media: MediaCardItemRatings_media
}

export default createComponent<Readonly<Props>>({
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

    return { meanScore, rating, reviews }
  },
})
</script>
