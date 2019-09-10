<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :[theme]="true"
    :color="color"
    v-on="$listeners"
  >
    <slot :[theme]="true" :theme="theme"></slot>
  </component>
</template>

<script lang="ts">
import { computed, createComponent } from '@vue/composition-api'
import Color from 'color'
import { VToolbar } from 'vuetify/lib'
// const VChip = () => import('vuetify/lib/components/VChip')
// const VBtn = () => import('vuetify/lib/components/VBtn')
// const VToolbar = () => import('vuetify/lib/components/VToolbar')

export interface Props {
  color: string
  tag: string
}

export default createComponent<Readonly<Props>>({
  components: {
    VToolbar,
  },
  inheritAttrs: false,
  props: {
    color: {
      default: '#ffffff',
      required: true,
      type: String,
    },
    tag: {
      default: 'span',
      required: false,
      type: String,
    },
  },
  setup(props) {
    const theme = computed(() =>
      Color(props.color).isLight() ? 'dark' : 'light',
    )

    return { theme }
  },
})
</script>
