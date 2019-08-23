import { VNode } from 'vue'
import { createElement } from 'vue-function-api'

interface Field {
  attrs: {
    placeholder?: string
    label: string
    clearable?: boolean
  }
  props: {
    validators?: ((v: string) => boolean)[]
    transformations?: ((v: string) => string)[]
    beforeTransform?: ((v: any) => any)[]
    clearable?: boolean
    afterTransform?: ((v: any) => any)[]
    value: any
  }
}

interface Textarea extends Field {
  attrs: Field['attrs'] & {
    'auto-grow'?: boolean
  }
}

interface Select extends Field {
  attrs: Field['attrs'] & {
    items: {
      manga: string
      text: string
      value: string
    }[]
    'item-value': string
    'item-text': string
  }
}

import BaseField from './BaseField.vue'
import { VFlex } from 'vuetify/lib'

export default class FormBuilder {
  public fields: VNode[]

  public constructor() {
    this.fields = []
  }

  public setSelects = (selects: Select[]) => {
    /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    const h = createElement
    this.fields.push(
      ...selects.map(props => (
        <VFlex xs12 md6>
          <BaseField {...props} tag="v-select" />
        </VFlex>
      ))
    )
  }

  public setFields = (selects: Field[]) => {
    /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    const h = createElement
    this.fields.push(
      ...selects.map(props => (
        <VFlex xs12 md6>
          <BaseField {...props} />
        </VFlex>
      ))
    )
  }

  public setDateFields = (selects: Field[]) => {
    /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    const h = createElement

    this.fields.push(
      ...selects.map(props => (
        <VFlex xs12 md6>
          <BaseField {...props} tag="BaseDateField" />
        </VFlex>
      ))
    )
  }

  public setTextareas = (selects: Textarea[]) => {
    /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    const h = createElement
    this.fields.push(
      ...selects.map(props => (
        <VFlex xs12>
          <BaseField {...props} tag="v-textarea" />
        </VFlex>
      ))
    )
  }

  public getFields() {
    return this.fields
  }
}
