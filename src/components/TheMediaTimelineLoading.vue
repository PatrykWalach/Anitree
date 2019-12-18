<template>
  <v-row justify="center" align="center">
    <v-col v-if="!$vuetify.breakpoint.xsOnly" cols="12">
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <TheMediaTimelineLoadingItem v-for="i in 3" :key="i" />
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
import TheMediaTimelineLoadingItem from './TheMediaTimelineLoadingItem.vue'
import { createComponent } from '@vue/composition-api'

export default createComponent({
  components: {
    MediaCardLoading,
    TheMediaTimelineLoadingItem,
  },
})
</script>
