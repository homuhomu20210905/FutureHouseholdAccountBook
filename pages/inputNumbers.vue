<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      金額を入力してください。
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item.name">
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.name">
        <div v-if="item.time != 4">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="(moneyInfo, mIndex) in timeMoneys[item.time]"
                  :key="moneyInfo.name + mIndex"
                  cols="12"
                >
                  <number
                    :tab="tab"
                    @change-value="moneyInfo.money = $event"
                  ></number>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col>
                  <h1>{{ item.name }}の合計金額{{ total(item.time) }}円</h1>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
        <div v-else>
          <v-row>
            <v-col v-for="totalItem in items" :key="totalItem.name" cols="12">
              <h2>
                {{ totalItem.name }}
                <timely-money :moneys="timesCalc(totalItem.time)" />
              </h2>
            </v-col>
          </v-row>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { times, timeCount, getComma, timePattern } from '../components/Times'
import Number from '../components/Number.vue'
import TimelyMoney from '../components/timelyMoney.vue'

export default {
  components: {
    Number,
    TimelyMoney,
  },
  data() {
    const items = times()
    const timeMoneys = {}
    items.forEach((item) => {
      timeMoneys[item.time] = []
      for (var i = 0; i < 10; i++) {
        timeMoneys[item.time].push({ name: '', money: 0 })
      }
    })
    return {
      tab: null,
      items,
      timeMoneys,
    }
  },
  computed: {
    calc() {
      return (value) => {
        let result = 0
        this.timeMoneys[value].forEach((item) => {
          result += item.money
        })
        return result
      }
    },
    timesCalc() {
      return (tab) => {
        if (this.tab != 4) {
          return null
        }
        const list = this.items
          .filter((item) => {
            return item.time == tab
          })
          .map((item) => {
            return this.timeCalcList(this.calc(item.time), item.time)
          })
        return list
      }
    },
  },
  methods: {
    total(value) {
      return getComma(this.calc(value))
    },
    timeCalcList(money, time) {
      //TODO 遅いと思われるので改善が必要。
      const list = timePattern.map((item) => {
        console.log('timeCount:' + timeCount(time, item.time))
        return getComma(Math.round(money * timeCount(time, item.time)))
      })
      return list
    },
  },
}
</script>
