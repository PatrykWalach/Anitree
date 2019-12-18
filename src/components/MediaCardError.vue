<template>
  <v-banner icon="warning" two-line :tile="false">
    There was an error while loading the data. Please make sure your have a
    stable internet connection and try again.
    <template v-slot:actions>
      <v-btn color="error" text @click.stop="query.refetch()">Retry</v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  props: { query: { default: null, required: true, type: Object } },
})
</script>
