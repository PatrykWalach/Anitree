<template>
  <v-list-item @click.stop>
    <v-list-item-content @click="cacheApollo = !cacheApollo">
      <v-list-item-title class="text-capitalize"
        >Cache data (Recommended)</v-list-item-title
      >
      <v-list-item-subtitle>
        Data Cache improves load times by caching all data to your browser's
        local storage. This may put more pressure on your CPU and
        memory.</v-list-item-subtitle
      >
    </v-list-item-content>

    <v-list-item-action>
      <v-switch v-model="cacheApollo"></v-switch>
    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
import useSettings from '@/store/settings'

export default {
  setup() {
    const { cacheApollo } = useSettings()

    return { cacheApollo }
  }
}
</script>
