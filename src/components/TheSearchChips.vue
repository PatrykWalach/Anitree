<template>
  <TheSearchChipsReady v-if="page && !loading" :page="page" />
  <v-chip-group
    v-else
    :style="{
      'max-width': '100%',
    }"
  >
    <v-skeleton-loader class="my-1 mr-2" v-for="i in 12" :key="i" type="chip" />
  </v-chip-group>
</template>
<script lang="ts">
import { Page } from '../graphql/schema/page'
import TheSearchChipsReady from './TheSearchChipsReady.vue'
import { createComponent } from '@vue/composition-api'

export interface Props {
  page: Page | null
  loading: boolean
}
import { useTheme } from './MediaCardProgress.vue'

export default createComponent<Readonly<Props>>({
  components: {
    TheSearchChipsReady,
  },
  props: {
    loading: { default: false, required: true, type: Boolean },
    page: { default: null, required: true, type: null },
  },
  setup() {
    return useTheme()
  },
})
</script>
