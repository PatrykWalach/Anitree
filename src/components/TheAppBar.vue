<template>
  <BaseQuery
    :apollo="{
      Media: {
        ...Media,
        tag: null,
      },
    }"
    v-slot="{ Media }"
  >
    <!-- <BaseQuery
    :apollo="{
      Media: {
        query: require('@/graphql/queries/Media.gql'),
        variables: { id: parseInt($route.params.mediaId, 10) },
        tag: null,
        skip: !$route.params.mediaId,
      },
    }"
    v-slot="{ Media }"
  > -->
    <v-app-bar
      app
      elevate-on-scroll
      :hide-on-scroll="$vuetify.breakpoint.xsOnly && extension"
      :flat="routeTitle && !$vuetify.breakpoint.xsOnly"
    >
      <v-tooltip v-if="!routeHome" bottom>
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

        <v-btn icon :to="{ name: 'search' }"> <v-icon>search</v-icon></v-btn>
        <TheAppBarViewer />
      </template>
      <template v-else>
        <TheAppBarSearch />
        <TheAppBarFilters />
      </template>
    </v-app-bar>
  </BaseQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import BaseQuery from './BaseQuery.vue'
import TheAppBarExtensionChips from './TheAppBarExtensionChips.vue'
import TheAppBarExtensionTabs from './TheAppBarExtensionTabs.vue'
import TheAppBarFilters from './TheAppBarFilters.vue'
import TheAppBarSearch from './TheAppBarSearch.vue'
import TheAppBarViewer from './TheAppBarViewer.vue'
import { useMedia } from '@/graphql'

export default createComponent({
  components: {
    BaseQuery,
    TheAppBarExtensionChips,
    TheAppBarExtensionTabs,
    TheAppBarFilters,
    TheAppBarSearch,
    TheAppBarViewer,
  },
  setup(_, { root }) {
    const routeTitle = computed(
      () =>
        root.$route.name === 'media-about' ||
        root.$route.name === 'media-timeline',
    )
    const routeHome = computed(() => root.$route.name === 'home')
    const routeSearch = computed(() => root.$route.name === 'search')

    const {
      getters: { getTitle },
    } = root.$modules.title

    const tabs = computed(
      () => routeTitle.value && root.$vuetify.breakpoint.xsOnly,
    )

    const extension = computed(
      () =>
        tabs.value ||
        (routeSearch.value && !!Object.keys(root.$route.query).length),
    )

    return {
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
