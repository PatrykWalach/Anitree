<template>
  <v-flex xs12 :md4="!full">
    <component
      :is="tag"
      :value="input"
      v-bind="$attrs"
      filled
      outlined
      @change="changeInput"
    >
    </component>
  </v-flex>
</template>

<script lang="ts">
import { Prop, Component, Vue, Watch } from 'vue-property-decorator'

const BaseDateField = () => import('./BaseDateField.vue')

@Component({
  components: {
    BaseDateField
  }
})
export default class MediaEditFormField extends Vue {
  @Prop({ default: 'v-text-field' })
  public readonly tag!: string

  @Prop({ default: '' })
  public readonly value!: any

  @Prop({ default: false })
  public readonly full!: boolean

  @Prop({ default: () => [] })
  public readonly validators!: ((v: string) => boolean)[]

  @Prop({ default: () => [] })
  public readonly transformations!: ((v: string) => string)[]

  @Prop({ default: () => [] })
  public readonly beforeTransform!: ((v: any) => string)[]

  @Prop({ default: () => [] })
  public readonly afterTransform!: [
    ((v: string) => any),
    ...((v: any) => any)[]
  ]

  input: string = ''

  public transform(input: any, transformations: Function[]) {
    return transformations.reduce(
      (str, transformation) => transformation(str),
      input
    )
  }

  @Watch('value', { immediate: true })
  valueChange(newValue: any) {
    const { transform, beforeTransform } = this
    const value = transform(newValue, beforeTransform)
    this.input = value
  }

  public changeInput(newValue: string) {
    const { afterTransform, transform, transformations } = this
    this.input = transform(newValue, transformations)
    if (this.isValid) {
      this.$emit('input', transform(this.input, afterTransform))
    } else {
      const { value, beforeTransform } = this
      this.input = transform(value, beforeTransform)
    }
  }

  get isValid() {
    const { validators, input } = this
    for (const validator of validators) {
      if (!validator(input)) {
        return false
      }
    }
    return true
  }
}
</script>
