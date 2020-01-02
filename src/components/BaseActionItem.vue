<template>
  <v-list-item v-bind="$attrs" v-on="$listeners">
    <v-tooltip :[right]="true" v-if="tooltip">
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-icon v-on="on" v-bind="attrs">
          <v-icon :color="iconColor">{{ icon }}</v-icon>
        </v-list-item-icon>
      </template>
      <span class="text-capitalize">
        {{ tooltip }}
      </span>
    </v-tooltip>
    <v-list-item-icon v-else>
      <v-icon :color="iconColor">{{ icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title class="text-capitalize">
        {{ title || icon }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

export default createComponent({
  inheritAttrs: false,
  props: {
    icon: { default: '', required: true, type: String },
    iconColor: { default: '', required: false, type: String },
    left: { default: false, required: false, type: Boolean },
    title: { default: '', required: false, type: String },
    tooltip: { default: '', required: false, type: String },
  },
  setup(props) {
    return {
      right: computed(() => (props.left ? 'right' : 'left')),
    }
  },
})
</script>
