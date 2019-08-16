<template>
  <v-container fill-height>
    <v-layout justify-center align-start>
      <TheSettings />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import TheSettings from '@/components/TheSettings.vue'

import { createComponent } from 'vue-function-api'

export default createComponent({
  components: {
    TheSettings
  }
})
</script>
