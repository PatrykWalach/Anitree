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
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Media, MediaDate, ValidDate } from '../types'
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

  get validStartDate() {
    const { isValidDate, media } = this
    return isValidDate(media.startDate)
  }

  get isRange(): boolean {
    const { isValidDate, media } = this
    const { startDate, endDate } = media
    if (isValidDate(startDate) && isValidDate(endDate)) {
      const start = Object.values(startDate)
      const end = Object.values(endDate)

      return !!start.filter((date, i) => date !== end[i]).length
    }
    return false
  }

  isValidDate = (date: MediaDate): date is ValidDate =>
    date.year !== null && date.month !== null
}
</script>
