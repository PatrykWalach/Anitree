<template>
  <v-chip v-if="startISO" class="body-2" label outlined>
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
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media, MediaDate } from '../types'
const BaseTimeRange = () => import('./BaseTimeRange.vue')
const BaseTime = () => import('./BaseTime.vue')

@Component({
  components: {
    BaseTimeRange,
    BaseTime
  }
})
export default class MediaCardTime extends Vue {
  @Prop({ required: true })
  readonly media!: Media

  get isRange() {
    return this.startISO && this.endISO && this.startISO !== this.endISO
  }

  get startISO() {
    return this.formatToISO(this.media.startDate)
  }

  get endISO() {
    return this.formatToISO(this.media.endDate)
  }

  formatToISO(date: MediaDate) {
    if (this.isValidDate(date)) {
      return this.date(date).toISOString()
    }
    return ''
  }

  date(date: MediaDate) {
    return new Date(
      date.year || 0,
      (date.month && date.month - 1) || 0,
      date.day || 0
    )
  }

  isValidDate = (date: MediaDate) => date.year !== null && date.month !== null
}
</script>
