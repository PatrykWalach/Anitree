<template>
  <v-list-item v-slot="{ active, toggle }">
    <v-list-item-content>
      <v-list-item-title class="text-capitalize">
        {{ title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <slot name="subtitle" v-bind="{ active, toggle }"></slot>
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <!-- <slot name="action" v-bind="{ active, toggle }"></slot> -->
      <v-switch v-model="active" @click="toggle"></v-switch>
    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  props: {
    title: { type: String, required: true, default: '' },
    subtitle: { type: String, required: false, default: '' }
  }
})
</script>
