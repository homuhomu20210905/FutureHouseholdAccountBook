import { mount } from '@vue/test-utils'
import component from '@/components/topmessage02.vue'

describe('topmessage02', () => {
  test('props check', async () => {
    const wrapper = mount(component)
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
  })
})
