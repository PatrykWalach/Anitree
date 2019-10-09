import BaseField from './BaseField.vue'

export interface Props {
  validators: ((v: string) => boolean)[]
  transformations: ((v: string) => string)[]
  tag: string
  beforeTransform: ((v: any) => any)[]
  afterTransform: ((v: any) => any)[]
  value: any
}

import { VCol } from 'vuetify/lib'
import { VNode } from 'vue'
import { createElement } from '@vue/composition-api'
const h = createElement

interface Field {
  attrs: {
    placeholder?: string
    label: string
    clearable?: boolean
  }
  props: Partial<Props>
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

export class FormBuilder {
  public fields: VNode[]

  public constructor() {
    this.fields = []
  }

  public setSelects = (selects: Select[]) => {
    this.fields.push(
      ...selects.map(({ attrs, props }) =>
        h(
          VCol,
          {
            props: {
              cols: 12,

              md: 6,
            },
          },
          [
            h(BaseField, {
              attrs: {
                ...attrs,
                filled: true,
                rounded: true,
              },
              props: {
                ...props,
                tag: 'v-select',
              },
            }),
          ],
        ),
      ),
    )
  }

  public setFields = (selects: Field[]) => {
    this.fields.push(
      ...selects.map(({ attrs, props }) =>
        h(
          VCol,
          {
            props: {
              cols: 12,

              md: 6,
            },
          },
          [
            h(BaseField, {
              attrs: {
                ...attrs,
                filled: true,
                rounded: true,
              },
              props,
            }),
          ],
        ),
      ),
    )
  }

  public setDateFields = (selects: Field[]) => {
    this.fields.push(
      ...selects.map(({ attrs, props }) =>
        h(
          VCol,
          {
            props: {
              cols: 12,
              md: 6,
            },
          },
          [
            h(BaseField, {
              attrs: {
                ...attrs,
                filled: true,
                rounded: true,
              },
              props: {
                ...props,
                tag: 'base-date-field',
              },
            }),
          ],
        ),
      ),
    )
  }

  public setTextareas = (selects: Textarea[]) => {
    this.fields.push(
      ...selects.map(({ attrs, props }) =>
        h(
          VCol,
          {
            props: {
              cols: 12,
            },
          },
          [
            h(BaseField, {
              attrs: {
                ...attrs,
                filled: true,
                rounded: true,
              },
              props: {
                ...props,
                tag: 'v-textarea',
              },
            }),
          ],
        ),
      ),
    )
  }

  public getFields() {
    return this.fields
  }
}
