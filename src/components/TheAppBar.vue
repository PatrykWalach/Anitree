<template>
  <ApolloQuery
    v-slot="{ result: { error, data }, isLoading, query }"
    :query="require('@/graphql/queries/Media.gql')"
    :variables="{ id: parseInt($route.params.mediaId) }"
    :tag="null"
    :skip="!$route.params.mediaId"
  >
    <v-app-bar
      app
      elevate-on-scroll
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

      <template
        v-if="$vuetify.breakpoint.xsOnly && routeTitle"
        v-slot:extension
      >
        <TheMediaTabs
          :style="{
            position: 'sticky',
            'z-index': 5,
            top: ($vuetify.breakpoint.smAndDown ? '56' : '64') + 'px',
          }"
        />
      </template>

      <template v-if="!routeSearch">
        <v-toolbar-title class="text-capitalize">
          <span v-if="routeTitle" :title="getTitle(data && data.Media.title)">
            {{ getTitle(data && data.Media.title) }}
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
  </ApolloQuery>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import TheAppBarFilters from './TheAppBarFilters.vue'
import TheAppBarSearch from './TheAppBarSearch.vue'
import TheAppBarViewer from './TheAppBarViewer.vue'
import TheMediaTabs from './TheMediaTabs.vue'

import { title } from '@/store/title'

export default createComponent({
  components: {
    TheAppBarFilters,
    TheAppBarSearch,
    TheAppBarViewer,
    TheMediaTabs,
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
    } = title

    const banner = computed(
      () => routeTitle.value && root.$vuetify.breakpoint.xsOnly,
    )

    return {
      banner,
      getTitle,
      routeHome,
      routeSearch,
      routeTitle,
    }
  },
})
</script>
