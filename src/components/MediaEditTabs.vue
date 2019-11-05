<template>
  <v-tabs v-model="syncedTab" grow v-bind="$attrs">
    <v-tab
      v-for="{ icon, title, bind } in edit"
      :key="title"
      v-bind="bind"
      :disabled="loading"
    >
      <v-icon left>{{ icon }}</v-icon>
      {{ title }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { NavigationElement } from '../types'

export interface Props {
  loading: boolean
  tab: string
}
export const useNavigation = () => {
  const edit: NavigationElement[] = [
    { bind: { href: '#edit1' }, icon: 'dashboard', title: 'Progress' },
    { bind: { href: '#edit2' }, icon: 'date_range', title: 'Dates' },
    { bind: { href: '#edit3' }, icon: 'insert_comment', title: 'Notes' },
    { bind: { href: '#edit4' }, icon: 'edit', title: ' Advanced Scores' },
  ]

  return { edit }
}
export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    loading: { default: false, required: true, type: Boolean },
    tab: { default: 'edit1', required: true, type: String },
  },
  setup(props, { emit }) {
    const syncedTab = computed({
      get: () => props.tab,
      set: e => emit('update:tab', e),
    })

    return {
      syncedTab,
      ...useNavigation(),
    }
  },
})
</script>
