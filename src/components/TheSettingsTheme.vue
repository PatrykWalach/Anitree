<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="text-capitalize">theme</v-list-item-title>
      <v-list-item-subtitle class="text-capitalize">{{
        dark ? 'dark' : 'light'
      }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-switch v-model="dark"></v-switch>
    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
import { createComponent, computed } from 'vue-function-api'

export default createComponent({
  setup(_, { root }) {
    const dark = computed(
      () => root.$vuetify.theme.dark,
      dark => {
        root.$vuetify.theme.dark = dark
        localStorage.setItem('THEME', dark.toString())
      }
    )

    return { dark }
  }
})
</script>
