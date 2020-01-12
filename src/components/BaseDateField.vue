<template>
  <VMenu
    ref="menu"
    v-model="menuActive"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <VTextField
        v-model="date"
        prepend-inner-icon="event"
        readonly
        v-bind="{ ...attrs, ...$attrs }"
        v-on="on"
        @click:clear="clear"
      />
    </template>
    <VDatePicker v-model="date" no-title scrollable>
      <VSpacer />
      <VBtn text color="accent" @click.stop="menuActive = false">
        Cancel
      </VBtn>
      <VBtn text color="accent" @click.stop="save">
        OK
      </VBtn>
    </VDatePicker>
  </VMenu>
</template>
<script lang="ts">
import { Ref, createComponent, ref, watch } from '@vue/composition-api'

export interface Props {
  value: string
}

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    value: {
      default: '',
      required: true,
      type: String,
    },
  },
  setup(props, { emit }) {
    const date = ref('')
    const menuActive = ref(false)
    const menu: Ref<any> = ref(null)

    watch(
      () => props.value,
      value => {
        date.value = value
      },
    )

    const save = () => {
      const newDate = date.value

      menu.value.save(newDate)
      if (newDate !== props.value) {
        emit('change', newDate)
      }
    }

    const clear = () => {
      emit('change', '')
    }

    return { clear, date, menu, menuActive, save }
  },
})
</script>
