<template>
  <v-menu
    ref="menu"
    v-model="menuActive"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    full-width
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
import { watch, ref, Ref, createComponent } from 'vue-function-api'

interface Props {
  value: string
}

export default createComponent({
  inheritAttrs: false,
  props: {
    value: {
      required: true,
      type: String
    }
  },
  setup(props: Readonly<Props>, { emit }) {
    const date = ref('')
    const menuActive = ref(false)
    const menu: Ref<any> = ref(null)

    watch(() => {
      date.value = props.value
    })

    function save() {
      const save: (score: string) => void = menu.value.save

      const _date = date.value

      save(_date)

      if (_date !== props.value) {
        emit('change', _date)
      }
    }

    function clear() {
      emit('change', '')
    }

    return { date, menuActive, save, clear, menu }
  }
})
</script>
