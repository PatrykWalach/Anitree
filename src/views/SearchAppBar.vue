<template>
  <div>
    <BaseAction
      :key="props.icon"
      v-bind="{ ...attrs, ...props }"
      v-on="on"
      v-for="{ attrs, props, on } in navigationElements"
      :title="null"
      :tooltip="props.title"
    />
  </div>
</template>
<script lang="ts">
import BaseAction from '@/components/BaseAction.vue'
import { createComponent } from '@vue/composition-api'
import { useViewSearchNavigation } from '@/hooks/viewSearchNavigation'

export default createComponent({
  components: { BaseAction },
  setup() {
    const navigationElements = useViewSearchNavigation()
    return {
      navigationElements,
    }
  },
})
</script>
