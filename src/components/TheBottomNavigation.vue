<template>
  <v-bottom-navigation app :value="value">
    <v-btn exact :to="{ name: 'home' }">
      <span>Home</span>
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn :to="{ name: 'search' }">
      <span>Search</span>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn exact :to="{ name: 'settings' }">
      <span>Settings</span>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { createComponent, computed } from 'vue-function-api'
export default createComponent({
  setup(_, { root }) {
    const value = computed(() => root.$route.name)
    return { value }
  }
})
</script>
