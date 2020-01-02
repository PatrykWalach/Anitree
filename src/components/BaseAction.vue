<template>
  <v-tooltip top>
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        text
        :color="iconColor"
        :icon="!title"
        v-on="{ ...on, ...$listeners }"
        v-bind="{ ...attrs, ...$attrs }"
      >
        <v-icon v-if="icon" :small="!!title" :left="!!title">{{ icon }}</v-icon>
        {{ title }}
      </v-btn>
    </template>
    <span class="text-capitalize">{{ tooltip || title || icon }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

interface Props {
  color?: string
  icon?: string
  title?: string
  tooltip?: string
}

export default createComponent<Readonly<Required<Props>>>({
  props: {
    icon: { default: '', required: false, type: String },
    iconColor: { default: '', required: false, type: String },
    title: { default: '', required: false, type: String },
    tooltip: { default: '', required: false, type: String },
  },
})
</script>
<style lang="scss" scoped></style>
