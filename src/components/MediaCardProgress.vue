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
import { createComponent, inject, computed, Wrapper } from 'vue-function-api'

export function useTheme() {
  const theme: void | Wrapper<{
    isDark: boolean
  }> = inject('theme')

  const color = computed(() =>
    theme && theme.value.isDark ? 'grey darken-2' : 'grey lighten-2'
  )

  return { theme, color }
}

export default createComponent({
  props: {
    height: {
      default: '1em',
      type: String
    },
    width: {
      default: '100%',
      type: String
    }
  },
  setup() {
    return useTheme()
  }
})
</script>
