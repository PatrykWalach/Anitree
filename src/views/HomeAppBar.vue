<template>
  <div :style="{ flex: 1, display: 'flex', justifyContent: 'flex-end' }">
    <VSpacer></VSpacer>
    <BaseAction
      bottom
      v-for="{ attrs, props, on } in navigationElements"
      :key="props.icon"
      v-bind="{ ...attrs, ...props }"
      :title="null"
      :tooltip="props.title"
      v-on="on"
    />
  </div>
</template>
<script lang="ts">
import BaseAction from '@/components/BaseAction.vue'
import { createComponent } from '@vue/composition-api'
import { useTheDrawerNavigation } from '@/components/TheDrawer.vue'

export default createComponent({
  components: { BaseAction },
  setup() {
    const navigationElements = useTheDrawerNavigation()
    return {
      navigationElements,
    }
  },
})
</script>
