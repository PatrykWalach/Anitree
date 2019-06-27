<template>
  <v-toolbar app color="primary" dark>
    <v-toolbar-side-icon
      @click.stop="toggleDrawer"
      aria-label="Toggle navigation drawer"
    >
    </v-toolbar-side-icon>
    <v-toolbar-title v-if="!$vuetify.breakpoint.xsOnly">
      <v-btn flat to="/" rel="canonical" exact>Anitree</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <TheToolbarSearch />
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
  @Emit('toggle:drawer')
  public toggleDrawer(e: Event) {
    return e
  }
}
</script>
