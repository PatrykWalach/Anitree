<template>
  <v-menu :[offset]="true">
    <template v-slot:activator="{ on }">
      <v-btn :icon="typeIcon" text v-on="on" v-bind="$attrs">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list :disabled="disabled">
        <slot></slot>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'

export default createComponent({
  inheritAttrs: false,
  props: {
    disabled: { default: false, required: false, type: Boolean },
    icon: { default: null, required: true, type: String },
    offsetX: { default: false, required: false, type: Boolean },
    typeIcon: { default: false, required: false, type: Boolean },
  },
  setup(props) {
    const offset = computed(() => (props.offsetX ? 'offsetX' : 'offsetY'))
    return { offset }
  },
})
</script>
