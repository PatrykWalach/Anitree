<template>
  <v-list-item @click.stop>
    <v-list-item-content @click="dark = !dark">
      <v-list-item-title class="text-capitalize">Site Theme</v-list-item-title>
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
import { createComponent, computed, SetupContext } from '@vue/composition-api'

export const useTheme = ({ root }: SetupContext) => {
  const dark = computed({
    get: () => root.$vuetify.theme.dark,
    set: dark => {
      root.$vuetify.theme.dark = dark
      localStorage.setItem('THEME', dark.toString())
    }
  })
  return { dark }
}

export default createComponent({
  setup(_, context) {
    return useTheme(context)
  }
})
</script>
