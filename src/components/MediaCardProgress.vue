<template>
  <v-sheet
    tile
    v-bind="{
      height,
      width,
      color,
      ...$attrs
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
import { createComponent, inject, computed } from '@vue/composition-api'

export function useTheme() {
  const theme = inject('theme', { isDark: false })

  const color = computed(() =>
    theme && theme.isDark ? 'grey darken-2' : 'grey lighten-2'
  )

  return { theme, color }
}

interface Props{
  height:string
  wifth:string
}
export default createComponent<Readonly<Props>>({
  props: {
    height: {
      required:false,
      default: '1em',
      type: String
    },
    width: {
      required:false,
      default: '100%',
      type: String
    }
  },
  setup: useTheme
})
</script>
