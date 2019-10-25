<template>
  <v-chip-group :style="{ 'max-width': '100%' }" :active-class="activeClass">
    <v-chip v-for="{ title, icon, to } in search" :key="title" exact :to="to">
      {{ title }}
    </v-chip>
  </v-chip-group>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useExtensionChip } from './TheAppBarExtensionChipsSearchReady.vue'

export default createComponent({
  setup(_, { root }) {
    const { search } = root.$modules.navigation

    return {
      ...useExtensionChip(),
      search,
    }
  },
})
</script>
