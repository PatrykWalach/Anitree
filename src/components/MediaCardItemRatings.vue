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
    <span class="grey--text text--lighten-2">
      {{ meanScore }}% ({{ reviews }})
    </span>
  </v-list-item-subtitle>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { Media } from '../graphql/schema/media'

import { useIntl } from '../utils/useIntl'

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

    const { formatNumber } = useIntl()

    const reviews = computed(() => formatNumber(props.media.popularity))

    return { rating, reviews, meanScore }
  },
})

export interface Props {
  media: Media
}
</script>
