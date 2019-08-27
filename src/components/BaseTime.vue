<template>
  <time :datetime="dateISO">{{ sliced | combine }}</time>
</template>
<script lang="ts">
import { ValidDate } from '../types'
import { createComponent, computed } from '@vue/composition-api'
export interface Props {
  date: ValidDate
  sliceDate: ValidDate | null
}

export default createComponent<Readonly<Props>>({
  filters: {
    combine: (parts: Intl.DateTimeFormatPart[]) =>
      parts.map(({ value }) => value).join('')
  },
  props: {
    date: { required: true, default: Object, type: null },
    sliceDate: { required: false, default: null, type: null }
  },
  setup(props){
    const toDate = (date: ValidDate) =>
      new Date(date.year, (date.month && date.month - 1) || 0, date.day || 1)

    const formatToParts = (date: ValidDate | null) => {
      if (date) {
        const fmt = new Intl.DateTimeFormat('en', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        return fmt.formatToParts(toDate(date))
      }
      return []
    }

    const formatToISO = (date: ValidDate) => toDate(date).toISOString()

    const partsAreEqual = (
      start: Intl.DateTimeFormatPart,
      end: Intl.DateTimeFormatPart
    ) => end && start && end.type === start.type && end.value === start.value

    const reduce = (
      start: Intl.DateTimeFormatPart[],
      end: Intl.DateTimeFormatPart[]
    ): Intl.DateTimeFormatPart[] => {
      if (partsAreEqual(start[0], end[0])) {
        end.shift()
        return reduce(start, end)
      }
      return end
    }

    const reduceReverse = (
      start: Intl.DateTimeFormatPart[],
      end: Intl.DateTimeFormatPart[]
    ): Intl.DateTimeFormatPart[] => {
      if (partsAreEqual(start[start.length - 1], end[start.length - 1])) {
        start.pop()
        return reduceReverse(start, end)
      }
      return start
    }

    const dateParts = computed(() => {
      return formatToParts(props.date)
    })

    const sliceDateParts = computed(() => {
      return formatToParts(props.sliceDate)
    })

    const dateISO = computed(() => {
      return formatToISO(props.date)
    })

    const sliced = computed(() => {
      if (props.sliceDate) {
        if (toDate(props.sliceDate) && toDate(props.date)) {
          return reduceReverse(dateParts.value.slice(), sliceDateParts.value)
        }
        return reduce(sliceDateParts.value, dateParts.value.slice())
      }

      return dateParts.value
    })

    return { dateParts, sliceDateParts, dateISO, sliced }
  }
})
</script>
