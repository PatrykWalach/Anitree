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
import { VChip, VToolbar, VBtn } from 'vuetify/lib'
import { computed, createComponent } from '@vue/composition-api'

// const VChip = () => import('vuetify/lib/components/VChip')
// const VBtn = () => import('vuetify/lib/components/VBtn')
// const VToolbar = () => import('vuetify/lib/components/VToolbar')
export interface Props {
  color: string
  tag: string
}

export default createComponent<Readonly<Props>>({
  components: {
    VChip,
    VBtn,
    VToolbar
  },
  props: {
    color: {
      type: String,
      default: '#ffffff',
      required: true
    },
    tag: {
      type: String,
      default: 'span',
      required:false
    }
  },
  setup(props){
    const colors = computed(
      () =>
        (props.color &&
          (props.color.substring(1).match(/.{1,2}/g) as string[])) ||
        []
    )

    const l = computed(() => {
      const r = [0.299, 0.587, 0.114]

      return (
        colors.value &&
        colors.value
          .map(color => parseInt(color, 16))
          .reduce((acc, color, i) => acc + color * r[i], 0)
      )
    })

    const theme = computed(() => {
      if (l.value) {
        return !(l.value > 186) ? 'dark' : 'light'
      }
      return null
    })

    return { colors, l, theme }
  }
})
</script>
