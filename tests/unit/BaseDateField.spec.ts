import { createLocalVue, shallowMount } from '@vue/test-utils'
import BaseDateField from '../../src/components/BaseDateField.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('BaseDateField.vue', () => {
  const wrapper = shallowMount(BaseDateField, {
    localVue,
    propsData: { value: '' },
    vuetify: new Vuetify(),
  })

  it('is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
