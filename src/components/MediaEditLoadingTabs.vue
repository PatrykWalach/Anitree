<template>
  <v-tabs grow v-bind="$attrs">
    <v-tab
      v-for="{ icon, title, bind } in tabs"
      :key="title"
      v-bind="bind"
      disabled
    >
      <VIcon left>
        {{ icon }}
      </VIcon>
      {{ title }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useMediaEditTabs } from './MediaEditTabs.vue'

export default defineComponent({
  inheritAttrs: false,
  setup() {
    const tabs = useMediaEditTabs()
    return { tabs }
  },
})
</script>
