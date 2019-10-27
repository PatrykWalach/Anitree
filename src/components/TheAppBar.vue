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
        <template v-else>
          Anitree <sup class="overline">alpha</sup>
        </template>
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
import { computed, createComponent } from '@vue/composition-api'
import { useAppBarActions, useFab, useRoutes } from '@/mixins'
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

    const { getTitle } = root.$modules.title

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
