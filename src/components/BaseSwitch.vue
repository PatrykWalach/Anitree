<template>
  <v-switch :value="value" @change="change"></v-switch>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class BaseSwitch extends Vue {
  @Prop()
  public readonly value!: boolean

  @Emit()
  public change(value: boolean) {
    return value
  }
}
</script>
