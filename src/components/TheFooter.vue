<template>
  <v-footer absolute app class="primary darken-1 caption" dark inset>
    <div v-if="!$vuetify.breakpoint.xsOnly">
      Powered by
    </div>
    <VBtn href="https://anilist.co" target="_blank" text rel="noopener">
      Anilist
    </VBtn>
    <VSpacer v-if="$vuetify.breakpoint.xsOnly" />

    <div v-if="!$vuetify.breakpoint.xsOnly">
      Made by
    </div>
    <VBtn
      href="https://github.com/PatrykWalach/Anitree"
      target="_blank"
      text
      rel="noopener"
    >
      <font-awesome-icon :icon="['fab', 'github']" />PatrykWałach
    </VBtn>
  </v-footer>
</template>
<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faGithub)

export default { components: { FontAwesomeIcon } }
</script>
