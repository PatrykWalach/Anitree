<template>
  <v-menu
    ref="menu"
    v-model="menuActive"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        prepend-inner-icon="event"
        readonly
        v-bind="{ ...attrs, ...$attrs }"
        v-on="on"
        @click:clear="clear"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menuActive = false">Cancel</v-btn>
      <v-btn text color="primary" @click="save">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script lang="ts">
import { watch, ref, Ref, createComponent } from '@vue/composition-api'

export interface Props {
  value: string
}

export default createComponent<Readonly<Props>>({
  inheritAttrs: false,
  props: {
    value: {
      required: true,
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const date = ref('')
    const menuActive = ref(false)
    const menu: Ref<any> = ref(null)

    watch(
      () => props.value,
      value => {
        date.value = value
      }
    )

    const save = () => {
      menu.value.save(date.value)

      if (date.value !== props.value) {
        emit('change', date.value)
      }
    }

    const clear = () => {
      emit('change', '')
    }

    return { date, menuActive, save, clear, menu }
  }
})
</script>
