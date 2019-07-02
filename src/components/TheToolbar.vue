<template>
  <v-toolbar app :scroll-off-screen="$vuetify.breakpoint.xsOnly">
    <v-tooltip v-if="search && $vuetify.breakpoint.xsOnly" bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="search = false"
          ><v-icon>arrow_back</v-icon></v-btn
        >
      </template>
      <span>Back</span>
    </v-tooltip>

    <template v-else>
      <v-toolbar-side-icon
        aria-label="Toggle navigation drawer"
        @click.stop="toggleDrawer"
      >
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <v-btn flat to="/" rel="canonical" exact>Anitree</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip v-if="$vuetify.breakpoint.xsOnly" bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="search = true"
            ><v-icon>search</v-icon></v-btn
          >
        </template>
        <span>Search</span>
      </v-tooltip>
    </template>

    <TheToolbarSearch
      v-if="!$vuetify.breakpoint.xsOnly || search"
      @submit="search = false"
      @keydown:esc="search = false"
    />
  </v-toolbar>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

import TheToolbarSearch from './TheToolbarSearch.vue'

@Component({
  components: {
    TheToolbarSearch
  }
})
export default class TheToolbar extends Vue {
  search: boolean = false

  @Emit('toggle:drawer')
  public toggleDrawer(e: Event) {
    return e
  }
}
</script>
