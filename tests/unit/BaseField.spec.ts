import { VueClass, createLocalVue, shallowMount } from '@vue/test-utils'
import BaseField from '@/components/BaseField.vue'
import Vue from 'vue'
import VueCompostionApi from '@vue/composition-api'
import Vuetify from 'vuetify'

describe('BaseField', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(VueCompostionApi)
  test('matches snapshot', () => {
    const wrapper = shallowMount(BaseField as VueClass<Vue>, {
      localVue,
      propsData: {
        value: '',
      },
      stubs: {
        VTextField: '<input/>',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
