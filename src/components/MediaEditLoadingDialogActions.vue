<template>
  <v-card-actions>
    <v-btn disabled color="error" text>Delete</v-btn>
    <v-spacer></v-spacer>
    <v-btn text outlined color="primary" @click.stop="close">Cancel</v-btn>
    <v-btn disabled depressed color="primary">Save</v-btn>
  </v-card-actions>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { useEdit } from '../store'

export default createComponent({
  setup() {
    const { close } = useEdit()

    return {
      close,
    }
  },
})
</script>
