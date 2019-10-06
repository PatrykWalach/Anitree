<template>
  <TheAppBarExtensionChipsNav v-if="!$route.query.search" />
  <TheAppBarExtensionChipsSearch v-else />
</template>
<script lang="ts">
import TheAppBarExtensionChipsNav from './TheAppBarExtensionChipsNav.vue'
import TheAppBarExtensionChipsSearch from './TheAppBarExtensionChipsSearch.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    TheAppBarExtensionChipsNav,
    TheAppBarExtensionChipsSearch,
  },
})
</script>
