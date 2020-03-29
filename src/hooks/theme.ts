import { SetupContext, computed, inject } from '@vue/composition-api'
import { setItem } from '@/localStorage'

export const useTheme = (root: SetupContext['root']) => {
  const dark = computed({
    get: () => root.$vuetify.theme.dark,
    set: (value) => {
      root.$vuetify.theme.dark = value

      const { dark, themes } = root.$vuetify.theme
      setItem('THEME', { dark, themes })
    },
  })
  return { dark }
}
export const useInjectedTheme = () => {
  const theme = inject('theme', { isDark: false })

  const color = computed(() =>
    theme.isDark ? 'grey darken-2' : 'grey lighten-2',
  )

  return { color, theme }
}
