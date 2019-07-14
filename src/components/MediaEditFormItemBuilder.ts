import { CreateElement, VNode } from 'vue'

interface Field {
  attrs: {
    placeholder?: string
    label: string
    validators?: ((v: string) => boolean)[]
    transformations?: ((v: string) => string)[]
    beforeTransform?: ((v: any) => string)[]
    clearable?: boolean
  }
  props: {
    id: string | number
    i?: number
    afterTransform?: ((v: string) => any)[]
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
        this.h('MediaEditFormItemField', {
          attrs: Object.assign(attrs, {
            tag: 'v-select'
          }),
          props
        })
      )
    )
  }

  public setFields(selects: Field[]) {
    this.fields.push(
      ...selects.map(data => this.h('MediaEditFormItemField', data))
    )
  }

  public setDateFields(selects: Field[]) {
    this.fields.push(
      ...selects.map(({ attrs, props }) =>
        this.h('MediaEditFormItemField', {
          attrs: Object.assign(attrs, {
            tag: 'BaseDateField'
          }),
          props
        })
      )
    )
  }
  public setTextareas(selects: Field[]) {
    this.fields.push(
      ...selects.map(({ attrs, props }) =>
        this.h('MediaEditFormItemField', {
          attrs: Object.assign(attrs, {
            tag: 'v-textarea',
            full: true
          }),
          props
        })
      )
    )
  }

  public getFields() {
    return this.fields
  }
}
