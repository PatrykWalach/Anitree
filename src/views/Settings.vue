<template>
  <v-container>
    <v-subheader>Settings</v-subheader>
    <v-row justify="center" align="start">
      <v-col>
        <TheSettings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import TheSettings from '@/components/TheSettings.vue'

export default {
  components: {
    TheSettings
  }
}
</script>
