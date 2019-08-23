<template>
  <span>
    <BaseTime :date="startDate" :slice-date="endDate" />
    <template>{{ divider }}</template>
    <BaseTime :date="endDate" :slice-date="startDate" />
  </span>
</template>
<script lang="ts">
import BaseTime from './BaseTime.vue'
import { ValidDate } from '../types'
import { ref, createComponent } from 'vue-function-api'

interface Props {
  startDate: ValidDate
  endDate: ValidDate
}
export default createComponent({
  components: {
    BaseTime
  },
  setup() {
    const divider = ref(' - ')
    return { divider }
  },
  props: {
    startDate: { required: true },
    endDate: { required: true }
  }
})
</script>
