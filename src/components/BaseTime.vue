<template>
  <time :datetime="dateISO">{{sliced | combine}}</time>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { MediaDate } from '../types'

@Component({
  filters: {
    combine: (parts: Intl.DateTimeFormatPart[]) =>
      // parts.reduce((str, { value }) => str + value, '')
      parts.map(({ value }) => value).join('')
  }
})
export default class BaseTime extends Vue {
  @Prop()
  public readonly date!: MediaDate

  @Prop({ default: null })
  public readonly sliceDate!: MediaDate | null

  get dateParts() {
    return this.formatToParts(this.date)
  }
  get sliceDateParts() {
    return this.formatToParts(this.sliceDate)
  }

  get dateISO() {
    return this.formatToISO(this.date)
  }

  public formatToISO(date: MediaDate) {
    if (this.isValidDate(date)) {
      return this.toDate(date).toISOString()
    }
    return ''
  }

  public formatToParts(date: MediaDate | null) {
    if (this.isValidDate(date)) {
      const fmt = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      return fmt.formatToParts(this.toDate(date as MediaDate))
    }
    return []
  }

  public toDate(date: MediaDate) {
    return new Date(date.year || 0, date.month || 0, date.day || 0)
  }

  public isValidDate = (date: MediaDate | null) =>
    !!(date && (date.year || date.month || date.day))

  get sliced() {
    if (this.sliceDate) {
      if (this.toDate(this.sliceDate) > this.toDate(this.date)) {
        return this.reduceReverse(
          this.dateParts.slice(),
          this.sliceDateParts.slice()
        )
      }
      return this.reduce(this.sliceDateParts.slice(), this.dateParts.slice())
    }
    return this.dateParts
  }

  public reduce(
    start: Intl.DateTimeFormatPart[],
    end: Intl.DateTimeFormatPart[]
  ): Intl.DateTimeFormatPart[] {
    if (this.partsAreEqual(start[0], end[0])) {
      end.shift()
      return this.reduce(start, end)
    }
    return end
  }

  public reduceReverse(
    start: Intl.DateTimeFormatPart[],
    end: Intl.DateTimeFormatPart[]
  ): Intl.DateTimeFormatPart[] {
    if (this.partsAreEqual(start[start.length - 1], end[start.length - 1])) {
      start.pop()
      return this.reduceReverse(start, end)
    }
    return start
  }

  public partsAreEqual(
    start: Intl.DateTimeFormatPart,
    end: Intl.DateTimeFormatPart
  ) {
    return end && start && end.type === start.type && end.value === start.value
  }
}
</script>
