<template>
  <v-btn icon @click="change">
    <v-icon>
      <slot v-if="value"></slot>
      <slot v-else name="alt"></slot> </v-icon
  ></v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class MediaEditIcon extends Vue {
  @Prop({ required: true })
  public readonly value!: boolean

  @Emit()
  public change() {
    return !this.value
  }
}
</script>
