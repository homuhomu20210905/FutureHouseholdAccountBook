import { mount } from '@vue/test-utils'
import timelyMoney from '@/components/timelyMoney.vue'

describe('timelyMoney test', () => {
  test('props check1', async () => {
    const timeCalc = [[0, 10, 20, 30, -1]]
    const wrapper = mount(timelyMoney, { propsData: { moneys: timeCalc } })
    expect(wrapper.vm).toBeTruthy()
    // console.log(wrapper.html())
  })
  test('props check2', async () => {
    const timeCalc = null // [[0, 10, 20, 30, -1]]
    const wrapper = mount(timelyMoney, { propsData: { moneys: timeCalc } })
    expect(wrapper.vm).toBeTruthy()
    // console.log(wrapper.html())
  })
})
