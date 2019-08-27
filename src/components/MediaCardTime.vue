<template>
  <v-chip v-if="validStartDate" class="body-2" label outlined>
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
import { ValidDate } from '../types'
import { Media, FuzzyDate } from '@/apollo/schema/media'
import { createComponent, computed } from '@vue/composition-api'
const BaseTimeRange = () => import('./BaseTimeRange.vue')
const BaseTime = () => import('./BaseTime.vue')

export interface Props {
  media: Media
}

export default createComponent<Readonly<Props>>({
  components: {
    BaseTimeRange,
    BaseTime
  },
  props: {
    media: { required: true, type: Object, default: null }
  },
  setup(props) {
    const isValidDate = (date: FuzzyDate): date is ValidDate =>
      date.year !== null && date.month !== null

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

    return { validStartDate, isRange }
  }
})
</script>
