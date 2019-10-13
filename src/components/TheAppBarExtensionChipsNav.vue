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

export default createComponent({
  setup(_, { root }) {
    const {
      state: { search },
    } = root.$modules.navigation

    return {
      search,
    }
  },
})
</script>
