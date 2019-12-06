import { createLocalVue, shallowMount } from '@vue/test-utils'
import BaseDateField from '@/components/BaseDateField.vue'
import VueCompostionApi from '@vue/composition-api'
import Vuetify from 'vuetify'

describe('BaseDateField', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(VueCompostionApi)
  test('matches snapshot', () => {
    const wrapper = shallowMount(BaseDateField, {
      localVue,
      propsData: {
        value: '',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
