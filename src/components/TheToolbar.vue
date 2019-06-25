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

    <TheToolbarAutocomplete />
    <!-- <TheToolbarItems/> -->
  </v-toolbar>
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

import TheToolbarItems from './TheToolbarItems.vue'
import TheToolbarAutocomplete from './TheToolbarAutocomplete.vue'

@Component({
  components: {
    TheToolbarItems,
    TheToolbarAutocomplete
  }
})
export default class TheToolbar extends Vue {
  @Emit('toggle:drawer')
  public toggleDrawer(e: Event) {
    return e
  }
}
</script>
