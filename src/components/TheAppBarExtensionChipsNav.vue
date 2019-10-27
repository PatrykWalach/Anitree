<template>
  <v-chip-group :style="{ 'max-width': '100%' }" :active-class="activeClass">
    <v-chip
      v-for="{ title, icon, bind } in search"
      :key="title"
      v-bind="bind"
      exact
    >
      <v-icon left>{{ icon }}</v-icon>
      {{ title }}
    </v-chip>
  </v-chip-group>
</template>
<script lang="ts">
import { useExtensionChip, useSearchNavigation } from '@/mixins'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  setup() {
    return {
      ...useExtensionChip(),
      ...useSearchNavigation(),
    }
  },
})
</script>
