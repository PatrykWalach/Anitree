import { createLocalVue, shallowMount } from '@vue/test-utils'
import BaseField from '../../src/components/BaseField.vue'
import CompositionApi from '@vue/composition-api'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(CompositionApi)

describe('BaseField', () => {
  let vuetify: typeof Vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('is a component', () => {
    const wrapper = shallowMount(BaseField, {
      localVue,
      propsData: { value: '' },
      vuetify,
    })

    wrapper.find('.v-text-field').trigger('input', { payload: 'test' })

    expect(wrapper.emitted().input.length).toStrictEqual(1)
  })
})

// afterTransform: { default: () => [], required: false, type: Array },
// beforeTransform: { default: () => [], required: false, type: Array },
// tag: {
//   default: 'v-text-field',
//   required: false,
//   type: String,
// },
// transformations: { default: () => [], required: false, type: Array },
// validators: { default: () => [], required: false, type: Array },
// value: {
//   default: '',
//   required: false,
//   type: null,
// },
