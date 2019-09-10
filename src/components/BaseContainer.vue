<template>
  <v-container :fill-height="loading" v-bind="$attrs">
    <template v-if="!loading">
      <slot></slot>
    </template>
    <v-row v-else justify="center" align="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
  </v-container>
</template>
<script lang="ts">
export default {
  inheritAttrs: false,
  props: {
    loading: {
      default: false,
      required: true,
      type: Boolean
    }
  }
}
</script>
