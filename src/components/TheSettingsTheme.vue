<template>
  <v-list-item @click.stop>
    <v-list-item-content @click="dark = !dark">
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
import { createComponent, computed } from '@vue/composition-api'

export default createComponent<{}>({
  setup(_, { root }) {
    const dark = computed({
      get: () => root.$vuetify.theme.dark,
      set: dark => {
        root.$vuetify.theme.dark = dark
        localStorage.setItem('THEME', dark.toString())
      }
    })

    return { dark }
  }
})
</script>
