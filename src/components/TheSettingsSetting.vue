<template>
  <v-list-item v-slot="{ active, toggle }" v-bind="$attrs">
    <v-list-item-content>
      <v-list-item-title class="text-capitalize">
        <slot name="title" v-bind="{ active, toggle }"></slot>
        {{ title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <slot name="subtitle" v-bind="{ active, toggle }"></slot>
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-if="action">
      <v-switch v-model="active" @click="toggle"></v-switch>
    </v-list-item-action>
  </v-list-item>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  inheritAttrs: false,
  props: {
    action: { default: true, required: false, type: Boolean },
    subtitle: { default: '', required: false, type: String },
    title: { default: '', required: false, type: String },
  },
})
</script>
