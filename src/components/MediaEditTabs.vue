<template>
  <v-tabs
    v-model="syncedTab"
    grow
    v-bind="$attrs"
    background-color="transparent"
    color="accent"
  >
    <v-tab
      v-for="{ attrs, props } in tabs"
      :key="props.icon"
      v-bind="{ ...attrs, ...props }"
    >
      <v-icon left>
        {{ props.icon }}
      </v-icon>
      {{ props.title }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { NavigationElement } from '../types'
import { useSync } from '@/hooks/sync'

export interface Props {
  tab: string
}
export const useMediaEditTabs = () => {
  const tabs: NavigationElement[] = [
    {
      attrs: { href: '#edit1' },
      props: { icon: 'dashboard', title: 'Progress' },
    },
    {
      attrs: { href: '#edit2' },
      props: { icon: 'date_range', title: 'Dates' },
    },
    {
      attrs: { href: '#edit3' },
      props: { icon: 'insert_comment', title: 'Notes' },
    },
    {
      attrs: { href: '#edit4' },
      props: { icon: 'edit', title: ' Advanced Scores' },
    },
  ]

  return tabs
}
export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    tab: { default: 'edit1', required: true, type: String },
  },
  setup(props, { emit }) {
    const syncedTab = useSync(props, 'tab', emit)

    const tabs = useMediaEditTabs()

    return {
      syncedTab,
      tabs,
    }
  },
})
</script>
