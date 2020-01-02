<template>
  <v-list rounded>
    <BaseActionItem
      :key="props.icon"
      v-bind="{ ...attrs, ...props }"
      v-on="on"
      v-for="{ attrs, props, on } in navigationElements"
    />
  </v-list>
</template>
<script lang="ts">
import BaseActionItem from '@/components/BaseActionItem.vue'
import { createComponent } from '@vue/composition-api'
import { useViewSearchNavigation } from '@/hooks/viewSearchNavigation'
export default createComponent({
  components: { BaseActionItem },
  setup() {
    const navigationElements = useViewSearchNavigation()
    return {
      navigationElements,
    }
  },
})
</script>
