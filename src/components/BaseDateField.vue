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
        label="Picker in menu"
        prepend-inner-icon="event"
        readonly
        v-bind="$attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="change">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class BaseDateField extends Vue {
  @Prop()
  public readonly value!: string

  date: string = ''
  menu: boolean = false

  @Watch('value', { immediate: true })
  changeDate(value: string) {
    this.date = value
  }

  public change() {
    const { value, date } = this

    const save: Function = (this.$refs.menu as any).save
    save(date)

    if (date !== value) {
      return this.$emit('change', date)
    }
  }
}
</script>
