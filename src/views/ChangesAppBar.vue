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
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: { BaseAction },
})
</script>
