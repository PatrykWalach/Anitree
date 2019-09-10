<template>
  <v-sheet
    tile
    v-bind="{
      height,
      width,
      color,
      ...$attrs,
    }"
  ></v-sheet>

  <!-- <v-sheet
    tile
    v-bind="{ height, color, ...$attrs }"
    :style="{
      'margin-bottom': '.2em'
    }"
  ></v-sheet> -->
</template>

<script lang="ts">
import { computed, createComponent, inject } from '@vue/composition-api'

export const useTheme = () => {
  const theme = inject('theme', { isDark: false })

  const color = computed(() =>
    theme && theme.isDark ? 'grey darken-2' : 'grey lighten-2',
  )

  return { color, theme }
}

interface Props {
  height: string
  wifth: string
}
export default createComponent<Readonly<Props>>({
  props: {
    height: {
      default: '1em',
      required: false,
      type: String,
    },
    width: {
      default: '100%',
      required: false,
      type: String,
    },
  },
  setup: useTheme,
})
</script>
