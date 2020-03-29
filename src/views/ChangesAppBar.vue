<template>
  <div :style="{ display: 'contents' }">
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

export default defineComponent({
  components: { BaseAction },
})
</script>
