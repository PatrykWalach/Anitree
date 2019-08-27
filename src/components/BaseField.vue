<template>
  <component :is="tag" v-model="input" v-bind="$attrs" @change="changeInput">
    <slot></slot>
  </component>
</template>

<script lang="ts">
const BaseDateField = () => import('./BaseDateField.vue')
import { VTextField, VTextarea, VSelect, VChipGroup } from 'vuetify/lib'

import { ref, watch, computed, createComponent } from '@vue/composition-api'

export interface Props {
  validators: ((v: string) => boolean)[]
  transformations: ((v: string) => string)[]
  tag: string
  beforeTransform: ((v: any) => any)[]
  afterTransform: ((v: any) => any)[]
  value: any
}

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  components: {
    BaseDateField,
    VTextField,
    VTextarea,
    VSelect,
    VChipGroup
  },
  props: {
    tag: {
      required: false,
      default: 'v-text-field',
      type: String
    },
    validators: { required: false, default: () => [], type: Array },
    transformations: { required: false, default: () => [], type: Array },
    beforeTransform: { required: false, default: () => [], type: Array },
    afterTransform: { required: false, default: () => [], type: Array },
    value: {
      required: false,
      default: '',
      type: null
    }
  },
  setup(props, { emit }) {
    const input = ref('')
    const transform = (input: any, transformations: Function[]) =>
      transformations.reduce(
        (str, transformation) => transformation(str),
        input
      )

    watch(
      () => props.value,
      _value => {
        input.value = transform(_value, props.beforeTransform)
      }
    )

    const isValid = computed(() => {
      for (const validator of props.validators) {
        if (!validator(input.value)) {
          return false
        }
      }
      return true
    })

    const changeInput = (newValue: string) => {
      input.value = transform(newValue, props.transformations)
      if (isValid.value) {
        emit('input', transform(input.value, props.afterTransform))
      } else {
        input.value = transform(props.value, props.beforeTransform)
      }
    }

    return { input, isValid, changeInput }
  }
})
</script>
