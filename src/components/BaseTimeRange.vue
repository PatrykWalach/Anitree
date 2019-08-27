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
import { ref, createComponent } from '@vue/composition-api'

export interface Props {
  startDate: ValidDate
  endDate: ValidDate
}
export default createComponent<Readonly<Props>>({
  components: {
    BaseTime
  },
  setup() {
    const divider = ref(' - ')
    return { divider }
  },
  props: {
    startDate: { required: true,type:Object,default:null },
    endDate: { required: true,type:Object,default:null }
  }
})
</script>
