import { mount, shallowMount } from '@vue/test-utils'
import iConSelect from '@/components/iconSelect.vue'
import Vuetify from 'vuetify'

const vuetify = new Vuetify()

describe('mount', () => {
  test('props check', async () => {
    // const wrapper = mount(iConSelect)
    // await wrapper.setProps({ position: 1 })
    const wrapper = shallowMount(iConSelect, {
      propsData: { position: 1 },
      vuetify,
    })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.vm.current).toBe('浪費')
    expect(wrapper.element).toMatchSnapshot()
    // expect(wrapper.emitted('update:choiceStatusId')).toBeTruthy()
    // expect(wrapper.emitted('update:choiceStatusId')[0][0]).toBe(100)

    // await wrapper.setProps({ position: 1 })
    // expect(wrapper.vm).toBeTruthy()
    // expect(wrapper.vm.current).toBe('浪費')
  })
})
