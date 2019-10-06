<template>
  <v-chip-group :style="{ 'max-width': '100%' }" active-class="primary--text">
    <v-chip
      label
      outlined
      v-for="{ title, icon, to } in search"
      :key="title"
      exact
      :to="to"
    >
      <v-icon left>{{ icon }}</v-icon>
      {{ title }}
    </v-chip>
  </v-chip-group>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'

import { navigation } from '@/store/navigation'

export default createComponent({
  setup() {
    const {
      state: { search },
    } = navigation

    return {
      search,
    }
  },
})
</script>
