<template>
  <v-progress-linear :color="color" :value="50" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useInjectedTheme } from '@/hooks/theme'

export default defineComponent({
  setup() {
    return useInjectedTheme()
  },
})
</script>
