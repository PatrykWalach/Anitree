<template>
  <v-card>
    <v-card-title>
      <slot name="title" />
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({})
</script>
