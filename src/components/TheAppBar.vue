<template>
  <BaseQuery
    :apollo="{
      Viewer,
      Media: {
        ...Media,
        tag: null,
      },
    }"
    v-slot="{ Media }"
  >
    <v-app-bar
      app
      elevate-on-scroll
      :flat="routeTitle && !$vuetify.breakpoint.xsOnly"
    >
      <v-tooltip v-if="!mainRoute" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="$router.back()"
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
          <span v-if="routeTitle" :title="getTitle(Media && Media.title)">
            {{ getTitle(Media && Media.title) }}
          </span>
          <template v-else-if="!routeHome">
            {{ $route.name }}
          </template>
          <template v-else>
            Anitree <sup class="overline">alpha</sup>
          </template>
        </v-toolbar-title>
      </template>

      <template v-if="!routeSearch">
        <v-spacer></v-spacer>
        <v-btn
          v-if="!active.to || active.to.name !== 'search' || bottomNavigation"
          icon
          :to="{ name: 'search' }"
        >
          <v-icon>search</v-icon></v-btn
        >
      </template>
      <template v-else>
        <TheAppBarSearch />
      </template>

      <template v-if="routeTitle">
        <v-tooltip bottom>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              icon
              :disabled="!Media"
              v-on="on"
              @click.stop="Media && share(Media)"
            >
              <v-icon>share</v-icon>
            </v-btn>
          </template>
          <span>Share</span>
        </v-tooltip>
      </template>

      <!-- <template v-if="routeTitle">
        <v-tooltip bottom>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              icon
              :disabled="!Media"
              rel="noopener"
              target="_blank"
              :href="Media && Media.siteUrl"
              v-on="on"
            >
              <v-icon>open_in_new</v-icon>
            </v-btn>
          </template>
          <span>Anilist</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              icon
              :disabled="!Media"
              v-on="on"
              @click.stop="share(Media)"
            >
              <v-icon>share</v-icon>
            </v-btn>
          </template>
          <span>Share</span>
        </v-tooltip>
      </template> -->
      <TheAppBarMenu :media="Media" :routeTitle="routeTitle" />
    </v-app-bar>
  </BaseQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import { useMedia, useViewer } from '@/graphql'
import BaseQuery from './BaseQuery.vue'
import TheAppBarExtensionChips from './TheAppBarExtensionChips.vue'
import TheAppBarExtensionTabs from './TheAppBarExtensionTabs.vue'
import TheAppBarMenu from './TheAppBarMenu.vue'
import TheAppBarSearch from './TheAppBarSearch.vue'
import TheAppBarViewer from './TheAppBarViewer.vue'
import { useBottomNavigation } from '@/App.vue'
import { useFab } from './TheFab.vue'
import { useShare } from './MediaCardActions.vue'

export default createComponent({
  components: {
    BaseQuery,
    TheAppBarExtensionChips,
    TheAppBarExtensionTabs,
    TheAppBarMenu,
    TheAppBarSearch,
    TheAppBarViewer,
  },
  setup(_, { root }) {
    const routeTitle = computed(() => {
      const { name } = root.$route
      return name === 'media-about' || name === 'media-timeline'
    })
    const routeHome = computed(() => root.$route.name === 'home')
    const routeSearch = computed(() => root.$route.name === 'search')

    const { getTitle } = root.$modules.title

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
      ...useShare(root),
      ...useViewer(root),
      ...useBottomNavigation(root),
      ...useMedia(() => ({ id: parseInt(root.$route.params.mediaId, 10) })),
      extension,
      getTitle,
      routeHome,
      routeSearch,
      routeTitle,
      tabs,
    }
  },
})
</script>
