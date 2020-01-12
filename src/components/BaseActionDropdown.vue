<template>
  <VMenu :[offset]="true">
    <template v-slot:activator="{ on }">
      <VBtn :icon="typeIcon" text v-on="on" v-bind="$attrs">
        <VIcon v-text="icon" />
      </VBtn>
    </template>
    <VCard>
      <VList :disabled="disabled">
        <slot></slot>
      </VList>
    </VCard>
  </VMenu>
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
