<template>
  <VList rounded>
    <BaseActionItem
      v-for="{ attrs, props, on } in navigationElements"
      :key="props.icon"
      v-bind="{ ...attrs, ...props }"
      v-on="on"
    />
  </VList>
</template>
<script lang="ts">
import BaseActionItem from '@/components/BaseActionItem.vue'
import { defineComponent } from '@vue/composition-api'
import { useViewSearchNavigation } from '@/hooks/viewSearchNavigation'
export default defineComponent({
  components: { BaseActionItem },
  setup() {
    const navigationElements = useViewSearchNavigation()
    return {
      navigationElements,
    }
  },
})
</script>
