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
            <v-icon>
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

import { useFab, useInjectedTheme, useMainNavigation } from '@/mixins'

import TheDrawerViewer from './TheDrawerViewer.vue'
import { User } from '../graphql/schema/viewer'

export interface Props {
  value: boolean
  viewer: User | null
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
      ...useMainNavigation(root),
      ...useInjectedTheme(),
      ...useFab(root),
    }
  },
})
</script>
