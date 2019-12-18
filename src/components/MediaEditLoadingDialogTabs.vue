<template>
  <v-tabs grow v-bind="$attrs">
    <v-tab
      v-for="{ icon, title, bind } in edit"
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
import { useNavigation } from './MediaEditDialogTabs.vue'

export default createComponent({
  inheritAttrs: false,
  setup() {
    return useNavigation()
  },
})
</script>
