import { createLocalVue, shallowMount } from '@vue/test-utils'
import BaseDateField from '../../src/components/BaseDateField.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('BaseDateField', () => {
  let vuetify: typeof Vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('is a component', () => {
    const wrapper = shallowMount(BaseDateField, {
      localVue,
      propsData: { value: '' },
      vuetify,
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
