<template>
  <span>
    <BaseTime :date="startDate" :slice-date="endDate" />
    <template>{{ divider }}</template>
    <BaseTime :date="endDate" :slice-date="startDate" />
  </span>
</template>
<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import BaseTime from './BaseTime.vue'
import { ValidDate } from '../types'

export interface Props {
  startDate: ValidDate
  endDate: ValidDate
}
export default createComponent<Readonly<Props>>({
  components: {
    BaseTime,
  },
  props: {
    endDate: { default: null, required: true, type: Object },
    startDate: { default: null, required: true, type: Object },
  },
  setup() {
    const divider = ref(' - ')
    return { divider }
  },
})
</script>
