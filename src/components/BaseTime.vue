<template>
  <time :datetime="dateISO">{{ sliced | combine }}</time>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { ValidDate } from '../types'

@Component({
  filters: {
    combine: (parts: Intl.DateTimeFormatPart[]) =>
      parts.map(({ value }) => value).join('')
  }
})
export default class BaseTime extends Vue {
  @Prop({ required: true })
  readonly date!: ValidDate

  @Prop({ default: null })
  readonly sliceDate!: ValidDate | null

  get dateParts() {
    return this.formatToParts(this.date)
  }

  get sliceDateParts() {
    return this.formatToParts(this.sliceDate)
  }

  get dateISO() {
    return this.formatToISO(this.date)
  }

  formatToISO(date: ValidDate) {
    return this.toDate(date).toISOString()
  }

  formatToParts(date: ValidDate | null) {
    if (date) {
      const fmt = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      return fmt.formatToParts(this.toDate(date))
    }
    return []
  }

  toDate(date: ValidDate) {
    return new Date(
      date.year,
      (date.month && date.month - 1) || 0,
      date.day || 1
    )
  }

  get sliced() {
    const { toDate, sliceDateParts, date, sliceDate, dateParts } = this
    if (sliceDate) {
      if (toDate(sliceDate) > toDate(date)) {
        const { reduceReverse } = this
        return reduceReverse(dateParts.slice(), sliceDateParts.slice())
      }
      const { reduce } = this
      return reduce(sliceDateParts.slice(), dateParts.slice())
    }

    return dateParts
  }

  reduce(
    start: Intl.DateTimeFormatPart[],
    end: Intl.DateTimeFormatPart[]
  ): Intl.DateTimeFormatPart[] {
    if (this.partsAreEqual(start[0], end[0])) {
      end.shift()
      return this.reduce(start, end)
    }
    return end
  }

  reduceReverse(
    start: Intl.DateTimeFormatPart[],
    end: Intl.DateTimeFormatPart[]
  ): Intl.DateTimeFormatPart[] {
    if (this.partsAreEqual(start[start.length - 1], end[start.length - 1])) {
      start.pop()
      return this.reduceReverse(start, end)
    }
    return start
  }

  partsAreEqual(start: Intl.DateTimeFormatPart, end: Intl.DateTimeFormatPart) {
    return end && start && end.type === start.type && end.value === start.value
  }
}
</script>
