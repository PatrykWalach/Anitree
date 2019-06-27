<template>
  <v-footer app inset>
    <v-spacer></v-spacer>Made by
    <v-btn
      href="https://github.com/PatrykWalach/Anitree"
      target="_blank"
      flat
      rel="noopener"
    >
      <FontAwesomeIcon :icon="['fab', 'github']" />PatrykWałach
    </v-btn>
  </v-footer>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGithub)

@Component({
  components: { FontAwesomeIcon }
})
export default class TheFooter extends Vue {}
</script>
