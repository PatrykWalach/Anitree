<template>
  <v-fab-transition>
    <v-btn
      :key="active.icon"
      v-bind="{ ...active.bind, ...$attrs }"
      v-on="active.on"
      color="accent"
      fab
      large
      dark
      right
    >
      <v-icon>{{ active.icon }}</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script lang="ts">
import TheSearchFilters from './TheSearchFilters.vue'
import { createComponent } from '@vue/composition-api'

import { useFab } from '@/mixins'
export default createComponent({
  components: {
    TheSearchFilters,
  },
  inheritAttrs: false,
  setup(_, { root }) {
    return useFab(root)
  },
})
</script>
