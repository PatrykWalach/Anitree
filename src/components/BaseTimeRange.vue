<template>
  <span>
    <BaseTime :date="startDate" :slice-date="endDate" />
    <template>{{ divider }}</template>
    <BaseTime :date="endDate" :slice-date="startDate" />
  </span>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import BaseTime from './BaseTime.vue'
import { MediaDate } from '../types'

@Component({
  components: {
    BaseTime
  }
})
export default class BaseTimeRange extends Vue {
  @Prop({ required: true })
  readonly startDate!: MediaDate
  @Prop({ required: true })
  readonly endDate!: MediaDate

  divider: string = ' - '
}
</script>
