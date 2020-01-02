<template>
  <v-tabs grow v-bind="$attrs">
    <v-tab
      v-for="{ icon, title, bind } in tabs"
      :key="title"
      v-bind="bind"
      disabled
    >
      <v-icon left>{{ icon }}</v-icon>
      {{ title }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useMediaEditTabs } from './MediaEditTabs.vue'

export default createComponent({
  inheritAttrs: false,
  setup() {
    const tabs = useMediaEditTabs()
    return { tabs }
  },
})
</script>
