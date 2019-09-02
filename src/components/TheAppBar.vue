<template>
  <v-app-bar app elevate-on-scroll>
    <v-tooltip v-if="search || settings" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" @click="$router.back()"
          ><v-icon>arrow_back</v-icon></v-btn
        >
      </template>
      <span>Back</span>
    </v-tooltip>

    <template v-if="!search">
      <v-toolbar-title class="text-capitalize">
        <template v-if="settings">
          {{ $route.name }}
        </template>
        <v-btn v-else text to="/" rel="canonical" exact>Anitree</v-btn>
      </v-toolbar-title>
    </template>

    <v-spacer v-if="!search"></v-spacer>

    <template v-if="!settings">
      <TheAppBarSearch v-if="!$vuetify.breakpoint.xsOnly || search" />
      <v-btn v-else icon :to="{ name: 'search' }"
        ><v-icon>search</v-icon></v-btn
      >
    </template>

    <template v-if="!search">
      <TheAppBarViewer />
    </template>

    <TheAppBarFilters v-else />
  </v-app-bar>
</template>
<script lang="ts">
import TheAppBarSearch from './TheAppBarSearch.vue'
import TheAppBarViewer from './TheAppBarViewer.vue'
import TheAppBarFilters from './TheAppBarFilters.vue'

import { createComponent, computed } from '@vue/composition-api'

export default createComponent({
  components: {
    TheAppBarSearch,
    TheAppBarViewer,
    TheAppBarFilters
  },
  setup(_, { root }) {
    const search = computed(() => root.$route.name === 'search')
    const settings = computed(() => root.$route.name === 'settings')

    return { search, settings }
  }
})
</script>
