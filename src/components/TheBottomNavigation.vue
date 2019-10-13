<template>
  <v-bottom-navigation
    app
    :value="value"
    :color="theme.isDark ? undefined : 'primary'"
  >
    <v-btn v-for="{ to, icon, title } in main" :key="title" exact :to="to">
      <span>{{ title }}</span>
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

import { useTheme } from './TheMediaStats.vue'

export default createComponent({
  setup(_, { root }) {
    const value = computed(() => root.$route.name)

    const {
      state: { main },
    } = root.$modules.navigation
    const { theme } = useTheme()

    return {
      main,
      theme,
      value,
    }
  },
})
</script>
