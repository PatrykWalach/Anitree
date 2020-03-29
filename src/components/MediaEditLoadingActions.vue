<template>
  <VCardActions>
    <VBtn disabled color="error" text>
      Delete
    </VBtn>
    <VSpacer />
    <VBtn text outlined color="accent" @click.stop="$emit('close')">
      Cancel
    </VBtn>
    <VBtn disabled depressed color="accent">
      Save
    </VBtn>
  </VCardActions>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
