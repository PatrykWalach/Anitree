<template>
  <v-card-actions>
    <v-btn disabled color="error" text>
      Delete
    </v-btn>
    <v-spacer />
    <v-btn text outlined color="accent" @click.stop="$emit('close')">
      Cancel
    </v-btn>
    <v-btn disabled depressed color="accent">
      Save
    </v-btn>
  </v-card-actions>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  setup() {
    return {}
  },
})
</script>
