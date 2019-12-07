import {
  ThisTypedShallowMountOptions,
  createLocalVue,
  shallowMount,
} from '@vue/test-utils'
import Vue from 'vue'
import VueCompostionApi from '@vue/composition-api'
import Vuetify from 'vuetify'

export const matchSnapshot = (
  Component: any,
  options: ThisTypedShallowMountOptions<Vue>,
  name: string = 'matches snapshot',
) =>
  test(name, () => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    localVue.use(VueCompostionApi)

    const wrapper = shallowMount(Component, {
      localVue,
      vuetify: new Vuetify(),
      ...options,
    })
    expect(wrapper.element).toMatchSnapshot()
  })
