import { CreateElement, VNode } from 'vue'

interface Field {
  attrs: {
    placeholder?: string
    label: string
    clearable?: boolean
  }
  props: {
    validators?: ((v: string) => boolean)[]
    transformations?: ((v: string) => string)[]
    beforeTransform?: ((v: any) => string)[]
    clearable?: boolean
    afterTransform?: ((v: any) => any)[]
    value: any
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

export class MediaEditFormItemBuilder {
  public h: CreateElement
  public fields: VNode[]

  public constructor(h: CreateElement) {
    this.h = h
    this.fields = []
  }

  public setSelects(selects: Select[]) {
    this.fields.push(
      ...selects.map(({ attrs, props }) =>
        this.h('BaseField', {
          props: Object.assign(props, {
            tag: 'v-select'
          }),
          attrs
        })
      )
    )
  }

  public setFields(selects: Field[]) {
    this.fields.push(...selects.map(data => this.h('BaseField', data)))
  }

  public setDateFields(selects: Field[]) {
    this.fields.push(
      ...selects.map(({ attrs, props }) =>
        this.h('BaseField', {
          props: Object.assign(props, {
            tag: 'BaseDateField'
          }),
          attrs
        })
      )
    )
  }
  public setTextareas(selects: Field[]) {
    this.fields.push(
      ...selects.map(({ attrs, props }) =>
        this.h('BaseField', {
          props: Object.assign(props, {
            tag: 'v-textarea',
            full: true
          }),
          attrs
        })
      )
    )
  }

  public getFields() {
    return this.fields
  }
}
