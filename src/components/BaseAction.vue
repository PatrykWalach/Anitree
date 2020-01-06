<template>
  <v-tooltip :[top]="true">
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        text
        :color="iconColor"
        :icon="!title"
        v-bind="{ ...attrs, ...$attrs }"
        v-on="{ ...on, ...$listeners }"
      >
        <v-icon v-if="icon" :small="!!title" :left="!!title">
          {{ icon }}
        </v-icon>
        {{ title }}
      </v-btn>
    </template>
    <span class="text-capitalize">{{ tooltip || title || icon }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'

interface Props {
  iconColor?: string
  icon?: string
  title?: string
  tooltip?: string
  bottom?: boolean
}

export default createComponent<Readonly<Required<Props>>>({
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
