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

    <v-list nav>
      <TheDrawerLoadingViewer v-if="loading" />
      <TheDrawerViewer
        :extended.sync="extended"
        v-else-if="viewer"
        :viewer="viewer"
      />
      <TheDrawerLogin v-else :disabled="!!token" />
      <v-divider></v-divider>
    </v-list>

    <v-expand-transition>
      <keep-alive>
        <TheDrawerList v-if="extended && viewer" :viewer="viewer" />
      </keep-alive>
    </v-expand-transition>

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

    <v-list nav>
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
    <!-- <template v-slot:append>
      <v-list>
        <v-list-item @click.stop>
          <v-list-item-icon>
            <v-icon>title</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Change Title
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click.stop>
          <v-list-item-icon>
            <v-icon>invert_colors</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Change Theme
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template> -->
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, createComponent, ref } from '@vue/composition-api'

import { Location } from 'vue-router'
import { NavigationElement } from '../types'
import TheDrawerLoadingViewer from './TheDrawerLoadingViewer.vue'
import TheDrawerLogin from './TheDrawerLogin.vue'
import { asyncComponent } from '../views/Search.vue'
import { useFab } from './TheFab.vue'
import { useQueryLoading } from '@vue/apollo-composable'
import { useTheme } from './TheMediaAboutStats.vue'
import { useViewer } from '../graphql'

const TheDrawerViewer = () =>
  asyncComponent(
    import(/* webpackChunkName: "TheDrawerViewer" */ './TheDrawerViewer.vue'),
    TheDrawerLoadingViewer,
  )
const TheDrawerList = () =>
  import(/* webpackChunkName: "TheDrawerList" */ './TheDrawerList.vue')

export interface Props {
  value: boolean
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
    TheDrawerList,
    TheDrawerLoadingViewer,
    TheDrawerViewer,
    TheDrawerLogin,
  },
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

    const { Viewer: viewer, token } = useViewer()
    const loading = useQueryLoading()
    const extended = ref(false)

    return {
      extended,
      loading,
      syncedValue,
      token,
      viewer,
      ...useNavigation(),
      ...useTheme(),
      ...useFab(root),
    }
  },
})
</script>
