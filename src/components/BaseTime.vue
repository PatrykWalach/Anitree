<template>
  <time>{{ formattedRange }}</time>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

import { ValidDate } from '@/types'

export interface Props {
  startDate: ValidDate
  endDate: ValidDate | null
}

export default createComponent<Readonly<Props>>({
  props: {
    endDate: { default: null, required: false, type: null },
    startDate: { default: null, required: true, type: Object },
  },
  setup(props) {
    const fmt = new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const toDate = ({ year, month, day }: ValidDate) =>
      new Date(year, month - 1, day || 1)

    const formattedRange = computed(() => {
      const { startDate, endDate } = props
      return fmt.formatRange(toDate(startDate), toDate(endDate || startDate))
    })

    return { formattedRange }
  },
})
</script>
