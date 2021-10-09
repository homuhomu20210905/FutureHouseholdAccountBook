import { mount } from '@vue/test-utils'
import totalMoney from '@/components/TotalMoney.vue'

describe('totalMoney', () => {
  test('props check', async () => {
    const wrapper = mount(totalMoney)
    await wrapper.setProps({ name: 'ほげ', money: 1000 })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.vm.name).toBe('ほげ')
    expect(wrapper.vm.absMoney).toBe(1000)
    expect(wrapper.vm.changeColor).toBe('')

    await wrapper.setProps({ name: 'ほげ2', money: -1500 })
    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.vm.name).toBe('ほげ2')
    expect(wrapper.vm.absMoney).toBe(1500)
    expect(wrapper.vm.changeColor).toBe('teal lighten-4--text')
  })
})
