<template>
  <v-tooltip top v-if="tooltip">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-on="{ ...on, ...$listeners }"
        v-bind="{ ...attrs, ...$attrs }"
      >
        <v-icon :color="iconColor">{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span class="text-capitalize">{{ tooltip }}</span>
  </v-tooltip>
  <v-btn icon v-else v-bind="$attrs" v-on="$listeners">
    <v-icon :color="iconColor">{{ icon }}</v-icon>
  </v-btn>
</template>
<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  inheritAttrs: false,
  props: {
    icon: { default: '', required: true, type: String },
    iconColor: { default: '', required: false, type: String },
    title: { default: '', required: false, type: String },
    tooltip: { default: '', required: false, type: String },
  },
})
</script>
