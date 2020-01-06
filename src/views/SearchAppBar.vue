<template>
  <v-app-bar app elevate-on-scroll hide-on-scroll>
    <BaseAction
      icon-color="secondary"
      icon="keyboard_arrow_left"
      tooltip="Back"
      @click.stop="$router.back()"
      bottom
    />
    <v-spacer></v-spacer>
    <BaseAction
      icon-color="secondary"
      bottom
      v-for="{ attrs, props, on } in navigationElements"
      :key="props.icon"
      v-bind="{ ...attrs, ...props }"
      :title="null"
      :tooltip="props.title"
      v-on="on"
    />
  </v-app-bar>
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
