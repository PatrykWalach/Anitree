<template>
  <ApolloQuery
    v-slot="{ result: { error, data }, isLoading, query }"
    :query="require('@/graphql/queries/Media.gql')"
    :variables="{ id: parseInt($route.params.mediaId) }"
    :tag="null"
    :skip="!$route.params.mediaId"
  >
    <v-app-bar
      :src="(banner && data && data.Media.bannerImage) || undefined"
      app
      :elevate-on-scroll="data && data.Media.bannerImage && banner"
      :shrink-on-scroll="data && data.Media.bannerImage && banner"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props"> <v-overlay absolute></v-overlay></v-img>
      </template>
      <!-- <template v-if="route('title')" v-slot:extension>
        <v-tabs align-with-title background-color="transparent">
          <v-tab href="#edit1">
            test1
          </v-tab>

          <v-tab href="#edit2">
            test2
          </v-tab></v-tabs
        >
      </template> -->

      <v-tooltip v-if="!routeHome" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="$router.back()"
            ><v-icon>arrow_back</v-icon></v-btn
          >
        </template>
        <span>Back</span>
      </v-tooltip>

      <template v-if="!routeSearch">
        <v-toolbar-title class="text-capitalize">
          <template v-if="routeTitle">
            {{ getTitle(data && data.Media.title) }}
          </template>
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
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" :to="{ name: 'search' }">
              <v-icon>search</v-icon></v-btn
            >
          </template>
          <span>Search</span>
        </v-tooltip> -->
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

import { title } from '@/store/title'

export default createComponent({
  components: {
    TheAppBarFilters,
    TheAppBarSearch,
    TheAppBarViewer,
  },
  setup(_, { root }) {
    const routeTitle = computed(() => root.$route.name === 'title')
    const routeHome = computed(() => root.$route.name === 'home')
    const routeSearch = computed(() => root.$route.name === 'search')

    const {
      getters: { getTitle },
    } = title

    const banner = computed(() => routeTitle && root.$vuetify.breakpoint.xsOnly)

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
