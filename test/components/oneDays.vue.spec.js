import { mount } from '@vue/test-utils'
import component from '@/components/oneDays.vue'
import child from '@/components/Number.vue'
import Times from '@/logic/Times'

const timeMoneys = {}
const tabMenus = Times.createTabMenu()
tabMenus.forEach((item) => {
  timeMoneys[item.value] = []
  for (let i = 0; i < 1; i++) {
    timeMoneys[item.value].push(
      Object.assign({}, Times.TimeLine('', Object.assign({}, item.cycle), 0))
    )
  }
})
describe('oneDays test', () => {
  test('work day props check1', async () => {
    const wrapper = mount(component, { propsData: { periods: timeMoneys.Work, tab: 0, item: tabMenus[0] } })
    expect(wrapper.vm).toBeTruthy()
    const c = wrapper.findComponent(child)
    expect(c.exists()).toBe(true)

    // console.log(wrapper.html())
  })
  test('work day props check2', async () => {
    const wrapper = mount(component, { propsData: { periods: timeMoneys.Holiday, tab: 1, item: tabMenus[1] } })
    expect(wrapper.vm).toBeTruthy()
    const c = wrapper.findComponent(child)
    expect(c.exists()).toBe(true)
  })
})
