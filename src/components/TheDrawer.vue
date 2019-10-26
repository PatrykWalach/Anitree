<template>
  <v-navigation-drawer
    v-model="syncedValue"
    app
    :mini-variant="!$vuetify.breakpoint.xsOnly"
    :permanent="!$vuetify.breakpoint.xsOnly"
  >
    <template v-if="$vuetify.breakpoint.xsOnly">
      <v-list>
        <v-list-item>
          <v-list-item-title>
            Anitree <sup class="overline">alpha</sup>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider />
    </template>
    <v-list :nav="!$vuetify.breakpoint.xsOnly">
      <v-list-item
        v-for="{ bind, title, icon } in main"
        :key="title"
        :color="theme.isDark ? undefined : 'primary'"
        v-bind="bind"
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  Ref,
  SetupContext,
  computed,
  createComponent,
} from '@vue/composition-api'
import { Location } from 'vue-router'
import { NavigationElement } from '../types'
import { useTheme } from './TheMediaAboutStats.vue'

export interface Props {
  value: boolean
}

export const useNavigation = (root: SetupContext['root']) => {
  const main: Ref<
    (NavigationElement & { bind: { to: Location } })[]
  > = computed(() => [
    {
      bind: { exact: true, to: { name: 'home' } },
      icon: 'home',
      title: 'Home',
    },
    {
      badge: {
        value: root.$modules.commands.pending.value.length,
      },
      bind: { exact: true, to: { name: 'changes' } },
      icon: 'change_history',
      title: 'Changes',
    },
    {
      bind: { exact: true, to: { name: 'settings' } },
      icon: 'settings',
      title: 'Settings',
    },
  ])

  return { main }
}
export default createComponent<Readonly<Props>>({
  props: {
    value: {
      default: false,
      required: true,
      type: Boolean,
    },
  },
  setup(props, { emit, root }) {
    const syncedValue = computed({
      get: () => props.value,
      set: value => emit('update:value', value),
    })

    const { theme } = useTheme()

    return { syncedValue, theme, ...useNavigation(root) }
  },
})
</script>
