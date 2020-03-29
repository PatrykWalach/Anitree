<template>
  <v-chip v-if="validStartDate" label outlined>
    <VIcon left small v-if="validEndDate">
      date_range
    </VIcon>
    <VIcon left small v-else>
      calendar_today
    </VIcon>
    <BaseTime
      :end-date="validEndDate ? media.endDate : undefined"
      :start-date="media.startDate"
    />
  </v-chip>
</template>
<script lang="ts">
import { FuzzyDateInput } from '@/../__generated__/globalTypes'
import { computed, defineComponent } from '@vue/composition-api'
import BaseTime from './BaseTime.vue'

import { ValidDate } from '../types'
import { TheTimelineItemTime_media } from './__generated__/TheTimelineItemTime_media'
import gql from 'graphql-tag'

export const TheTimelineItemTimeFragments = {
  media: gql`
    fragment TheTimelineItemTime_media on Media {
      id
      startDate {
        day
        year
        month
      }
      endDate {
        day
        year
        month
      }
    }
  `,
}

export interface Props {
  media: TheTimelineItemTime_media
}

export default defineComponent<Readonly<Props>>({
  components: {
    BaseTime,
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const isValidDate = (
      date: Omit<FuzzyDateInput, '__typename'> | null,
    ): date is ValidDate => {
      return !!date && date.year !== null && date.month !== null
    }

    const validStartDate = computed(() => isValidDate(props.media.startDate))

    const validEndDate = computed(() => isValidDate(props.media.endDate))

    return { validEndDate, validStartDate }
  },
})
</script>
