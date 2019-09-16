import { createLocalVue, shallowMount } from '@vue/test-utils'
import BaseContainer from '../../src/components/BaseContainer.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('BaseContainer.vue', () => {
  let vuetify: typeof Vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('is a component', () => {
    const wrapper = shallowMount(BaseContainer, {
      localVue,
      propsData: { loading: true },
      vuetify,
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('hides slot', () => {
    const wrapper = shallowMount(BaseContainer, {
      localVue,
      propsData: { loading: true },
      slots: {
        default: '<div class="test"></div>',
      },
      vuetify,
    })
    expect(wrapper.contains('.test')).toBe(false)
  })

  it('displays slot', () => {
    const wrapper = shallowMount(BaseContainer, {
      localVue,
      propsData: { loading: false },
      slots: {
        default: '<div class="test"></div>',
      },
      vuetify,
    })

    expect(wrapper.contains('.test')).toBe(true)
  })
})
