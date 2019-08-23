<template>
  <v-list-item @click.stop>
    <v-list-item-content @click="auto = !auto">
      <v-list-item-title>Autosave</v-list-item-title>
      <v-list-item-subtitle
        >Changes made to the list entry are{{
          auto ? ' ' : ' not '
        }}autosaved</v-list-item-subtitle
      >
    </v-list-item-content>

    <v-list-item-action>
      <v-switch v-model="auto"></v-switch>
    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
import { createComponent } from 'vue-function-api'
import useSubmit from '@/store/submit'

export default createComponent({
  setup() {
    const { auto } = useSubmit()

    return { auto }
  }
})
</script>
