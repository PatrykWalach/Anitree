<template>
  <component
    :is="tag"
    v-model="input"
    v-bind="$attrs"
    color="accent"
    @change="changeInput"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { VChipGroup, VSelect, VTextField, VTextarea } from 'vuetify/lib'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { Props } from './FormBuilder'

const BaseDateField = () =>
  import(
    /* webpackChunkName: "BaseDateField" */ /* webpackPrefetch: true */ './BaseDateField.vue'
  )

export default defineComponent<Readonly<Props>>({
  components: {
    BaseDateField,
    VChipGroup,
    VSelect,
    VTextField,
    VTextarea,
  },
  inheritAttrs: false,
  props: {
    afterTransform: { default: () => [], required: false, type: Array },
    beforeTransform: { default: () => [], required: false, type: Array },
    tag: {
      default: 'VTextField',
      required: false,
      type: String,
    },
    transformations: { default: () => [], required: false, type: Array },
    validators: {
      default: () => [],
      required: false,
      type: [Array, Set],
    },
    value: {
      default: '',
      required: false,
      type: null,
    },
  },
  setup(props, { emit }) {
    const input = ref('')
    const transform = (input: any, transformations: Function[]) =>
      transformations.reduce(
        (str, transformation) => transformation(str),
        input,
      )

    watch(
      () => props.value,
      (_value) => {
        input.value = transform(_value, props.beforeTransform)
      },
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
      const { transformations, afterTransform, beforeTransform, value } = props

      input.value = transform(newValue, transformations)
      if (isValid.value) {
        const finalValue = transform(input.value, afterTransform)
        emit('input', finalValue)
        emit('change', finalValue)
      } else {
        input.value = transform(value, beforeTransform)
      }
    }

    return { changeInput, input, isValid }
  },
})
</script>
