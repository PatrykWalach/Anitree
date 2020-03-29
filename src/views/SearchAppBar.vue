<template>
  <div :style="{ display: 'contents' }">
    <BaseAction
      bottom
      v-for="{ attrs, props, on } in navigationElements"
      :key="props.icon"
      v-bind="{ ...attrs, ...props }"
      :title="null"
      :tooltip="props.title"
      v-on="on"
    />
    <VSpacer></VSpacer>
    <BaseAction
      icon="home"
      exact
      tooltip="Home"
      :to="{ name: 'home' }"
      bottom
    />
  </div>
</template>
<script lang="ts">
import BaseAction from '@/components/BaseAction.vue'
import { defineComponent } from '@vue/composition-api'
import { useViewSearchNavigation } from '@/hooks/viewSearchNavigation'

export default defineComponent({
  components: { BaseAction },
  setup() {
    const navigationElements = useViewSearchNavigation()
    return {
      navigationElements,
    }
  },
})
</script>
