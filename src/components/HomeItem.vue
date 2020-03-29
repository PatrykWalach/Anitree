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
import { defineComponent } from '@vue/composition-api'
export default defineComponent({})
</script>
