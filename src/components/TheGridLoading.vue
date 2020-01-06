<template>
  <v-row dense>
    <v-col :cols="6" :sm="4" :md="3" :lg="2" :key="i" v-for="i in 12">
      <TheGridLoadingCard />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import TheGridLoadingCard from './TheGridLoadingCard.vue'

export default createComponent({
  components: { TheGridLoadingCard },
})
</script>
