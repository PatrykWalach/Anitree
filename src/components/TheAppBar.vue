<template>
  <ApolloQuery
    v-slot="{ result: { error, data }, isLoading, query }"
    :query="require('@/graphql/queries/Media.gql')"
    :variables="{ id: parseInt($route.params.mediaId) }"
    :tag="null"
    :skip="!$route.params.mediaId"
  >
    <v-app-bar
      :src="(route('title') && data && data.Media.bannerImage) || undefined"
      app
      elevate-on-scroll
      :shrink-on-scroll="route('title')"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props">
          <!--    :gradient="
            `to top right, 
          ${(data &&
            data.Media.coverImage.color &&
            color(data.Media.coverImage.color)
              .alpha(0.4)
              .hsl()
              .string()) ||
            'rgba(0, 47, 75, .7)'}, ${(data &&
              data.Media.coverImage.color &&
              color(data.Media.coverImage.color)
                .negate()

                .alpha(0.4)
                .hsl()
                .string()) ||
              'rgba(220, 66, 37, .7)'}`
          "-->

          <v-overlay absolute></v-overlay
        ></v-img>
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

      <v-tooltip v-if="!route('home')" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="$router.back()"
            ><v-icon>arrow_back</v-icon></v-btn
          >
        </template>
        <span>Back</span>
      </v-tooltip>

      <template v-if="!route('search')">
        <v-toolbar-title class="text-capitalize">
          <template v-if="route('title')">
            {{ title(data && data.Media.title) }}
          </template>
          <template v-else-if="!route('home')">
            {{ $route.name }}
          </template>
          <template v-else>
            Anitree <sup class="overline">alpha</sup>
          </template>
        </v-toolbar-title>
      </template>

      <template v-if="!route('search')">
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
import Color from 'color'
import TheAppBarFilters from './TheAppBarFilters.vue'
import TheAppBarSearch from './TheAppBarSearch.vue'
import TheAppBarViewer from './TheAppBarViewer.vue'
import { createComponent } from '@vue/composition-api'

import useTitle from '@/store/title'

export default createComponent({
  components: {
    TheAppBarFilters,
    TheAppBarSearch,
    TheAppBarViewer
  },
  setup(_, { root }) {
    const route = (name: string) => root.$route.name === name

    const { title } = useTitle()

    const color = (e: string) => Color(e)

    return { color, route, title }
  }
})
</script>
