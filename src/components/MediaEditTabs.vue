<template>
  <v-tabs v-model="tab" grow>
    <v-tab
      v-for="{ icon, title, href } in tabs"
      :key="title"
      :href="`#${href}`"
      :disabled="error || loading"
    >
      <v-icon left>{{ icon }}</v-icon>
      {{ title }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useEdit } from '../store/edit'

export interface Props {
  error: boolean
  loading: boolean
}

export default createComponent<Readonly<Props>>({
  props: {
    error: { default: false, required: true, type: Boolean },
    loading: { default: false, required: true, type: Boolean },
  },
  setup() {
    const { tab, tabs } = useEdit()

    return {
      tab,
      tabs,
    }
  },
})
</script>
