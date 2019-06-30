<template>
  <component :is="tag" v-bind="$attrs" :[theme]="true" :color="color">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class BaseColor extends Vue {
  @Prop()
  public readonly color!: string | null

  @Prop({ default: 'span' })
  public readonly tag!: string

  get colors() {
    const { color } = this
    return color && color.substring(1).match(/.{1,2}/g)
  }

  get l() {
    const { colors } = this
    const r = [0.299, 0.587, 0.114]
    return (
      colors &&
      colors
        .map(color => parseInt(color, 16))
        .reduce((acc, color, i) => acc + color * r[i], 0)
    )
  }

  get theme() {
    if (this.l) {
      return !(this.l > 186) ? 'dark' : 'light'
    }
    return null
  }
}
</script>
