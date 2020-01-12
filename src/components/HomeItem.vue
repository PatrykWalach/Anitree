<template>
  <VCard>
    <VCardTitle>
      <slot name="title" />
    </VCardTitle>
    <VCardText>
      <slot />
    </VCardText>
  </VCard>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({})
</script>
