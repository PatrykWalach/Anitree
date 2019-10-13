<template>
  <v-chip v-if="validStartDate" label outlined>
    <v-icon left small v-if="validEndDate">date_range</v-icon>
    <v-icon left small v-else>calendar_today</v-icon>
    <BaseTime
      :end-date="validEndDate ? media.endDate : undefined"
      :start-date="media.startDate"
    />
  </v-chip>
</template>
<script lang="ts">
import { FuzzyDate, Media } from '@/graphql/schema/media'
import { computed, createComponent } from '@vue/composition-api'
import BaseTime from './BaseTime.vue'
import { ValidDate } from '../types'

export interface Props {
  media: Media
}


export default createComponent<Readonly<Props>>({
  components: {
    BaseTime,
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const isValidDate = (
  date: Omit<FuzzyDate, '__typename'>,
): date is ValidDate => date.year !== null && date.month !== null

    const validStartDate = computed(() => isValidDate(props.media.startDate))

    const validEndDate = computed(() => isValidDate(props.media.endDate))

    return { validEndDate, validStartDate,  }
  },
})
</script>
