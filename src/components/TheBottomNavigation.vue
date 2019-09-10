<template>
  <v-bottom-navigation
    app
    :value="value"
    :color="theme.isDark ? undefined : 'primary'"
  >
    <v-btn exact :key="title" :to="to" v-for="{ to, icon, title } in main">
      <span>{{ title }}</span>
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import useNavigation from '@/store/navigation'
import { useTheme } from './MediaCardProgress.vue'

export default createComponent({
  setup(_, { root }) {
    const value = computed(() => root.$route.name)

    const { main } = useNavigation()
    const { theme } = useTheme()

    return {
      value,
      main,
      theme
    }
  }
})
</script>
