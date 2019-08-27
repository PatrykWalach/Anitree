<template>
  <v-container v-bind="$attrs">
    <template v-if="!loading">
      <slot></slot>
    </template>
    <v-row justify="center" align="center" v-else>
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
      type: Boolean,
      required:true
    }
  }
}
</script>
