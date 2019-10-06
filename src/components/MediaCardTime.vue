<template>
  <v-chip v-if="validStartDate" label outlined>
    <v-icon left small>date_range</v-icon>
    <BaseTimeRange
      v-if="isRange"
      :end-date="media.endDate"
      :start-date="media.startDate"
    />
    <BaseTime v-else :date="media.startDate" />
  </v-chip>
</template>
<script lang="ts">
import { FuzzyDate, Media } from '@/graphql/schema/media'
import { computed, createComponent } from '@vue/composition-api'
import { ValidDate } from '../types'
const BaseTimeRange = () => import('./BaseTimeRange.vue')
const BaseTime = () => import('./BaseTime.vue')

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseTime,
    BaseTimeRange,
  },
  props: {
    media: { default: null, required: true, type: Object },
  },
  setup(props) {
    const isValidDate = (
      date: Omit<FuzzyDate, '__typename'>,
    ): date is ValidDate => date.year !== null && date.month !== null

    const validStartDate = computed(() => isValidDate(props.media.startDate))

    const isRange = computed((): boolean => {
      const { startDate, endDate } = props.media
      if (isValidDate(startDate) && isValidDate(endDate)) {
        const start = Object.values(startDate)
        const end = Object.values(endDate)

        return !!start.filter((date, i) => date !== end[i]).length
      }
      return false
    })

    return { isRange, validStartDate }
  },
})
</script>
