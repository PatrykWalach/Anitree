<template>
  <v-tabs v-model="tab" grow>
    <v-tab
      v-for="{ icon, title, href } in tabs"
      :key="title"
      :href="`#${href}`"
      :disabled="loading"
    >
      <v-icon left>{{ icon }}</v-icon>
      {{ title }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

export interface Props {
  loading: boolean
}

export default createComponent<Readonly<Props>>({
  props: {
    loading: { default: false, required: true, type: Boolean },
  },
  setup(_, { root }) {
    const {
      state: { tab: _tab, tabs },
      mutations: { CHANGE_TAB },
    } = root.$modules.edit

    const tab = computed({ get: () => _tab.value, set: CHANGE_TAB })
    return {
      tab,
      tabs,
    }
  },
})
</script>
