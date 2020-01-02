<template>
  <v-progress-linear :color="color" :value="50"></v-progress-linear>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { useInjectedTheme } from '@/hooks/theme'

export default createComponent({
  setup() {
    return useInjectedTheme()
  },
})
</script>
