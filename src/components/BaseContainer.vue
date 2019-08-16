<template>
  <v-container fill-height>
    <v-layout justify-center align-center wrap>
      <template v-if="!loading">
        <slot></slot>
      </template>
      <v-progress-circular
        v-else
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
export default {
  props: {
    loading: {
      default: false,
      type: Boolean
    }
  }
}
</script>
