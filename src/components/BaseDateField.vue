<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        prepend-inner-icon="event"
        readonly
        v-bind="$attrs"
        v-on="on"
        @click:clear="clear"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="save">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({
  inheritAttrs: false
})
export default class BaseDateField extends Vue {
  @Prop()
  readonly value!: string

  date: string = ''
  menu: boolean = false

  @Watch('value', { immediate: true })
  changeDate(value: string) {
    this.date = value
  }

  save() {
    const { value, date } = this

    const save: (score: any) => void = (this.$refs.menu as any).save
    save(date)

    if (date !== value) {
      this.change(date)
    }
  }

  clear() {
    this.change('')
  }

  @Emit()
  change(date: string) {
    return date
  }
}
</script>
