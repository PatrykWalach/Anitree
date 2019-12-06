import { VueClass, createLocalVue, shallowMount } from '@vue/test-utils'
import BaseDateField from '@/components/BaseDateField.vue'
import Vue from 'vue'
import VueCompostionApi from '@vue/composition-api'
import Vuetify from 'vuetify'

describe('BaseDateField', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(VueCompostionApi)
  test('matches snapshot', () => {
    const wrapper = shallowMount(BaseDateField as VueClass<Vue>, {
      localVue,
      propsData: {
        value: '',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
