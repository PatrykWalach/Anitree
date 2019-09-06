<template>
  <v-list-item @click.stop>
    <v-list-item-content @click="cacheChanges = !cacheChanges">
      <v-list-item-title class="text-capitalize"
        >Cache changes (Recommended)</v-list-item-title
      >
      <v-list-item-subtitle>
        Store recent changes in browser cache
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-switch v-model="cacheChanges"></v-switch>
    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
import useSettings from '@/store/settings'

export default {
  setup() {
    const { cacheChanges } = useSettings()

    return { cacheChanges }
  }
}
</script>
