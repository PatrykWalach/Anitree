<template>
  <VList nav color="transparent">
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
import { useTheDrawerNavigation } from '@/components/TheDrawer.vue'

export default defineComponent({
  components: { BaseActionItem },
  setup() {
    const navigationElements = useTheDrawerNavigation()
    return {
      navigationElements,
    }
  },
})
</script>
