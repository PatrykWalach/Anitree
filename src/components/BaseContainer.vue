<template>
  <v-container fill-height v-bind="$attrs">
    <template v-if="!loading">
      <slot></slot>
    </template>
    <v-layout justify-center align-center wrap v-else>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
  props: {
    loading: {
      default: false,
      type: Boolean
    }
  }
}
</script>
