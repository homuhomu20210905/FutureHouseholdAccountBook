import { mount } from '@vue/test-utils'
import component from '@/components/sparkline.vue'

describe('sparkline', () => {
  test('props check', async () => {
    const wrapper = mount(component)
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
  })
})
