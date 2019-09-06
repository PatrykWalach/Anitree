<template>
  <v-list-item @click.stop>
    <v-list-item-content @click="syncChanges = !syncChanges">
      <v-list-item-title class="text-capitalize">Autosave</v-list-item-title>
      <v-list-item-subtitle
        >Changes made to the list entry are{{
          syncChanges ? ' ' : ' not '
        }}autosaved</v-list-item-subtitle
      >
    </v-list-item-content>

    <v-list-item-action>
      <v-switch v-model="syncChanges"></v-switch>
    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
import useSettings from '@/store/settings'

export default {
  setup() {
    const { syncChanges } = useSettings()

    return { syncChanges }
  }
}
</script>
