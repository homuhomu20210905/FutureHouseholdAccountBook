import { mount } from '@vue/test-utils'
import totalMoneis from '@/components/TotalMonies.vue'
import totalMoney from '@/components/TotalMoney.vue'
import Times from '@/logic/Times'

describe('totalMoneies', () => {
  test('props check', async () => {
    const timePattern = Object.assign([], Times.timePattern)
    const timeCalc = [0, 10, 20, 30, -1]
    const wrapper = mount(totalMoneis, { propsData: { timePattern, timeCalc } })
    expect(wrapper.vm).toBeTruthy()
    console.log(wrapper.html())
    const div = wrapper.findAll('.total-money')
    expect(div.length).toBe(timePattern.length)
    expect(div.is(totalMoney)).toBe(true)

    // const component = wrapper.findAllComponents(totalMoney)
    // expect(component).toHaveLength(timePattern.length)
  })
})
