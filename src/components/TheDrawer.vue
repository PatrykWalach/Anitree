<template>
  <v-navigation-drawer
    v-model="syncedValue"
    app
    :mini-variant="!$vuetify.breakpoint.xsOnly"
    :permanent="!$vuetify.breakpoint.xsOnly"
    mini-variant-width="72"
  >
    <template v-if="$vuetify.breakpoint.xsOnly">
      <v-list rounded>
        <v-list-item selectable>
          <v-list-item-title>
            Anitree <sup class="overline">alpha</sup>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>

    <TheDrawerViewer :viewer="viewer" />

    <v-list v-if="!$vuetify.breakpoint.xsOnly" rounded>
      <v-fab-transition>
        <v-list-item
          :key="active.icon"
          v-on="active.on"
          class="accent"
          v-bind="active.bind"
        >
          <v-list-item-icon>
            <v-icon color="white">
              {{ active.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ active.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-fab-transition>
    </v-list>

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
import { computed, createComponent } from '@vue/composition-api'

import { Location } from 'vue-router'
import { NavigationElement } from '../types'
import TheDrawerViewer from './TheDrawerViewer.vue'
import { User } from '../graphql/schema/viewer'
// import { useCommands } from '../store'
import { useFab } from './TheFab.vue'

import { useTheme } from './TheMediaAboutStats.vue'

export interface Props {
  value: boolean
  viewer: User | null
}

export const useNavigation = () => {
  // const { getPending } = useCommands()

  const main: NavigationElement<{
    to: Location
    exact: boolean
  }>[] = [
    {
      bind: { exact: true, to: { name: 'home' } },
      icon: 'home',
      title: 'Home',
    },
    {
      // badge: {
      //   value: getPending.value.length,
      // },
      bind: { exact: true, to: { name: 'changes' } },
      icon: 'change_history',
      title: 'Changes',
    },
    {
      bind: { exact: true, to: { name: 'settings' } },
      icon: 'settings',
      title: 'Settings',
    },
  ]

  return { main }
}

export default createComponent<Readonly<Props>>({
  components: {
    TheDrawerViewer,
  },
  props: {
    value: {
      default: false,
      required: true,
      type: Boolean,
    },
    viewer: {
      default: null,
      required: true,
      type: null,
    },
  },
  setup(props, { emit, root }) {
    const syncedValue = computed({
      get: () => props.value,
      set: value => emit('update:value', value),
    })

    return {
      syncedValue,
      ...useNavigation(),
      ...useTheme(),
      ...useFab(root),
    }
  },
})
</script>
