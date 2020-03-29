<template>
  <VTooltip :[top]="true">
    <template v-slot:activator="{ attrs, on }">
      <VBtn
        text
        :color="iconColor"
        :icon="!title"
        v-bind="{ ...attrs, ...$attrs }"
        v-on="{ ...on, ...$listeners }"
      >
        <VIcon v-if="icon" :small="!!title" :left="!!title" v-text="icon" />
        <span v-if="title" v-text="title" />
      </VBtn>
    </template>
    <span class="text-capitalize" v-text="tooltip || title || icon" />
  </VTooltip>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

interface Props {
  iconColor?: string
  icon?: string
  title?: string
  tooltip?: string
  bottom?: boolean
}

export default defineComponent<Readonly<Required<Props>>>({
  props: {
    icon: { default: '', required: false, type: String },
    iconColor: { default: '', required: false, type: String },
    title: { default: '', required: false, type: String },
    tooltip: { default: '', required: false, type: String },
    bottom: { default: false, required: false, type: Boolean },
  },
  setup(props) {
    return {
      top: computed(() => (props.bottom ? 'bottom' : 'top')),
    }
  },
})
</script>
<style lang="scss" scoped></style>
