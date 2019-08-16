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
      <v-toolbar-title>
        <template v-if="settings">
          Settings
        </template>
        <v-btn v-else text to="/" rel="canonical" exact>Anitree</v-btn>
      </v-toolbar-title>
    </template>

    <v-spacer v-if="!search"></v-spacer>
    <TheAppBarSearch
      v-if="(!settings && !$vuetify.breakpoint.xsOnly) || search"
    />
    <TheAppBarViewer v-if="!search" />
    <v-dialog v-else max-width="720px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-on="on" v-bind="attrs">
          <v-icon>tune</v-icon>
        </v-btn>
      </template>

      <SearchFilters />
    </v-dialog>
  </v-app-bar>
</template>
<script lang="ts">
import TheAppBarSearch from './TheAppBarSearch.vue'
import TheAppBarViewer from './TheAppBarViewer.vue'
import SearchFilters from './SearchFilters.vue'

import { createComponent, computed } from 'vue-function-api'

export default createComponent({
  components: {
    TheAppBarSearch,
    TheAppBarViewer,
    SearchFilters
  },
  setup(_, { root }) {
    const search = computed(() => root.$route.name === 'search')
    const settings = computed(() => root.$route.name === 'settings')

    return { search, settings }
  }
})
</script>
