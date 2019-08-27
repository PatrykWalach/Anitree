<template>
  <v-footer class="caption" absolute>
    <v-spacer></v-spacer>
    <div v-if="!$vuetify.breakpoint.xsOnly">
      Powered by
    </div>
    <v-btn href="https://anilist.co" target="_blank" text rel="noopener">
      Anilist
    </v-btn>

    <div v-if="!$vuetify.breakpoint.xsOnly">
      Made by
    </div>
    <v-btn
      href="https://github.com/PatrykWalach/Anitree"
      target="_blank"
      text
      rel="noopener"
    >
      <FontAwesomeIcon :icon="['fab', 'github']" />PatrykWałach
    </v-btn>
  </v-footer>
</template>
<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGithub)

export default { components: { FontAwesomeIcon } }
</script>
