<template>
  <v-row justify="center" align="center">
    <v-col v-if="!$vuetify.breakpoint.xsOnly" cols="12">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <TheTimelineLoadingItem v-for="i in 3" :key="i" />
      </v-timeline>
    </v-col>

    <template v-else>
      <v-col v-for="i in 5" :key="i" cols="12">
        <MediaCardLoading />
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import MediaCardLoading from './MediaCardLoading.vue'
import TheTimelineLoadingItem from './TheTimelineLoadingItem.vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    MediaCardLoading,
    TheTimelineLoadingItem,
  },
})
</script>
