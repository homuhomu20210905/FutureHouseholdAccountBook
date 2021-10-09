import { mount } from '@vue/test-utils'
import component from '@/components/topmessage01.vue'

describe('topmessage01', () => {
  test('props check', async () => {
    const wrapper = mount(component)
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
  })
})
