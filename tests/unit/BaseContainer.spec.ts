import { createLocalVue, shallowMount } from '@vue/test-utils'
import BaseContainer from '../../src/components/BaseContainer.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('BaseContainer.vue', () => {
  const wrapper = shallowMount(BaseContainer, {
    localVue,
    propsData: { loading: true },
    slots: {
      default: '<div class="test"></div>',
    },
    vuetify: new Vuetify(),
  })

  it('is a component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('hides slot', () => {
    expect(wrapper.contains('.test')).toBe(false)
  })

  it('displays slot', () => {
    wrapper.setProps({ loading: false })
    expect(wrapper.contains('.test')).toBe(true)
  })
})
