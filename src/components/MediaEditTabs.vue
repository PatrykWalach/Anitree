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
import { computed, createComponent } from '@vue/composition-api'
import { edit } from '../store/edit'

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
    const {
      state: { tab: _tab, tabs },
      mutations: { CHANGE_TAB },
    } = edit

    const tab = computed({ get: () => _tab.value, set: CHANGE_TAB })
    return {
      tab,
      tabs,
    }
  },
})
</script>
