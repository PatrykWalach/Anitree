<template>
  <v-chip v-if="startISO && endISO" class="body-2" label outline>
    <v-icon left small>date_range</v-icon>
    <BaseTimeRange
      v-if="isRange"
      :endDate="media.endDate"
      :startDate="media.startDate"
    />
    <BaseTime v-else :date="media.startDate" />
  </v-chip>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { AMedia, MediaDate } from '../types'
import BaseTimeRange from './BaseTimeRange.vue'
import BaseTime from './BaseTime.vue'
// import BaseChip from './BaseChip.vue'

@Component({
  components: {
    BaseTimeRange,
    BaseTime
    // BaseChip
  }
})
export default class BaseMediaTime extends Vue {
  @Prop()
  public readonly media!: AMedia

  get isRange() {
    return this.startISO && this.endISO && this.startISO !== this.endISO
  }

  get startISO() {
    return this.formatToISO(this.media.startDate)
  }

  get endISO() {
    return this.formatToISO(this.media.endDate)
  }

  public formatToISO(date: MediaDate) {
    if (this.isValidDate(date)) {
      return this.date(date).toISOString()
    }
    return ''
  }

  public date(date: MediaDate) {
    return new Date(date.year || 0, date.month || 0, date.day || 0)
  }

  public isValidDate = (date: MediaDate) => date.year && date.month && date.day
}
</script>
