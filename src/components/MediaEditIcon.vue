<template>
  <v-btn icon @click="change">
    <v-icon>
      <slot v-if="value"></slot>
      <slot v-else name="alt"></slot> </v-icon
  ></v-btn>
</template>
<script lang="ts">
import { createComponent } from 'vue-function-api'

export default createComponent({
  props: {
    value: { required: true, type: Boolean }
  },
  setup(props, { emit }) {
    const change = () => emit('change', !props.value)
    return { change }
  }
})
</script>
