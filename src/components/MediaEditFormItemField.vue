<template>
  <BaseField
    v-bind="$attrs"
    :value="value"
    :after-transform="[...afterTransform, ...transformations]"
    @input="changeForm"
  />
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import edit from '../store/modules/edit'

import BaseField from './BaseField.vue'

@Component({
  inheritAttrs: false,
  components: {
    BaseField
  }
})
export default class MediaEditFormItemField extends Vue {
  @Prop({ required: true })
  readonly id!: string | number

  @Prop({ required: false })
  readonly i!: number

  @Prop({ default: () => [] })
  readonly afterTransform!: [((v: string) => any), ...((v: any) => any)[]]

  get form() {
    return edit.form
  }

  get stored() {
    return edit.stored
  }

  get value(): any {
    const { form, stored, id, i } = this
    if (i !== undefined)
      return form[id] && form[id][i] !== undefined ? form[id][i] : stored[id][i]
    return form[id] || stored[id]
  }

  get transformations() {
    const { id, i } = this
    const transformations = [(e: any) => Object.fromEntries([[id, e]])]

    if (i !== undefined) {
      const { form, stored } = this
      transformations.unshift((e: any) => {
        const array: any[] = form[id] || stored[id]

        array[i] = e
        return array
      })
    }
    return transformations
  }

  changeForm(value: any) {
    edit.changeForm(value)
  }
}
</script>
