<template>
  <v-app-bar
    app
    elevate-on-scroll
    :flat="routeTitle && !$vuetify.breakpoint.xsOnly"
  >
    <v-tooltip v-if="!routeHome && !routeSearch" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click.stop="$router.back()"
          ><v-icon>arrow_back</v-icon></v-btn
        >
      </template>
      <span>Back</span>
    </v-tooltip>

    <template v-if="extension" v-slot:extension>
      <TheAppBarExtensionTabs v-if="tabs" />
      <TheAppBarExtensionChips v-else />
    </template>

    <template v-if="!routeSearch">
      <v-toolbar-title class="text-capitalize">
        <span v-if="routeTitle" :title="title">
          {{ title }}
        </span>
        <template v-else-if="!routeHome">
          {{ $route.name }}
        </template>
        <template v-else> Anitree <sup class="overline">alpha</sup> </template>
      </v-toolbar-title>
    </template>

    <TheAppBarSearch v-if="routeSearch" />

    <template v-if="!$vuetify.breakpoint.xsOnly">
      <v-spacer v-if="filteredActions.length"></v-spacer>
      <v-tooltip
        bottom
        :key="title"
        v-for="{ icon, bind, title, on: actionOn } in mainActions"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="{ ...bind, ...attrs }"
            icon
            v-on="{ ...on, ...actionOn }"
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ title }}</span>
      </v-tooltip>
      <TheAppBarMenu :media="media" bottom :actions="moreActions" />
    </template>
  </v-app-bar>
</template>
<script lang="ts">
import { SetupContext, computed, createComponent } from '@vue/composition-api'
import { Media } from '../graphql/schema/media'
import TheAppBarSearch from './TheAppBarSearch.vue'
const TheAppBarExtensionChips = () =>
  import(
    /* webpackChunkName: "TheAppBarExtensionChips" */ /* webpackPrefetch: true */ './TheAppBarExtensionChips.vue'
  )
const TheAppBarExtensionTabs = () =>
  import(
    /* webpackChunkName: "TheAppBarExtensionTabs" */ /* webpackPrefetch: true */ './TheAppBarExtensionTabs.vue'
  )
const TheAppBarMenu = () =>
  import(
    /* webpackChunkName: "TheAppBarMenu" */ /* webpackPrefetch: true */ './TheAppBarMenu.vue'
  )

import { useAppBarActions } from './TheBottomAppBar.vue'
import { useFab } from './TheFab.vue'

import { useNavigation } from './TheDrawer.vue'
import { useTitle } from '../store'

export const useRoutes = (root: SetupContext['root']) => {
  const routeTitle = computed(() => {
    const { name } = root.$route
    return name === 'media-about' || name === 'media-timeline'
  })
  const routeHome = computed(() => root.$route.name === 'home')
  const routeSearch = computed(() => root.$route.name === 'search')

  const { main } = useNavigation()

  const routeMain = computed(() => {
    const { name } = root.$route

    return !!main.find(({ bind }) => bind.to.name === name)
  })

  return {
    routeHome,
    routeMain,
    routeSearch,
    routeTitle,
  }
}
export interface Props {
  media: Media | null
}

export default createComponent<Readonly<Props>>({
  components: {
    TheAppBarExtensionChips,
    TheAppBarExtensionTabs,
    TheAppBarMenu,
    TheAppBarSearch,
  },
  props: {
    media: { default: null, required: true, type: null },
  },
  setup(props, { root }) {
    const { routeSearch, routeHome, routeTitle } = useRoutes(root)

    const { getTitle } = useTitle()

    const title = computed(() => {
      const media = props.media
      return getTitle.value(media && media.title)
    })

    const tabs = computed(
      () => routeTitle.value && root.$vuetify.breakpoint.xsOnly,
    )

    const extension = computed(
      () =>
        tabs.value ||
        (routeSearch.value && !!Object.keys(root.$route.query).length),
    )

    return {
      ...useFab(root),
      ...useAppBarActions(props, root),
      extension,
      routeHome,
      routeSearch,
      routeTitle,
      tabs,
      title,
    }
  },
})
</script>
