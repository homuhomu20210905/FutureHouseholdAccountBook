import { mount } from '@vue/test-utils'
import component from '@/components/topmessage03.vue'

describe('topmessage03', () => {
  test('props check', async () => {
    const wrapper = mount(component)
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
  })
})
