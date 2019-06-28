<template>
  <v-chip v-bind="$attrs" :dark="dark" :light="light" :color="color">
    <slot></slot>
  </v-chip>
</template>
<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'

@Component
export default class BaseChip extends Vue {
  @Prop()
  public readonly color!: string | null

  get colors() {
    return this.color && this.color.substring(1).match(/.{1,2}/g)
  }

  get l() {
    // const r = [0.2126, 0.7152, 0.0722]
    // return (
    //   this.colors &&
    //   this.colors .map(color => parseInt(color, 16))
    //     .map(c => c / 255)
    //     .map(c => {
    //       if (c <= 0.03928) {
    //         return c / 12.92
    //       }
    //       return ((c + 0.055) / 1.055) ** 2.4
    //     })
    //     .reduce((acc, c, i) => acc + c * r[i], 0)
    // )
    const r = [0.299, 0.587, 0.114]
    return (
      this.colors &&
      this.colors
        .map(color => parseInt(color, 16))
        .reduce((acc, color, i) => acc + color * r[i], 0)
    )
  }

  get dark() {
    // return !(this.l > Math.sqrt(1.05 * 0.05) - 0.05)
    if (this.l) {
      return !(this.l > 186)
    }
    return null
  }
  get light() {
    return this.dark === null ? this.dark : !this.dark
  }
}
</script>
