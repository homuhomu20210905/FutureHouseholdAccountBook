<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      金額を入力してください。
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in tabMenus" :key="item.name">
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabMenus" :key="item.name">
        <div v-if="item.value == 1 || item.value == 0">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="(moneyInfo, mIndex) in timeMoneys[item.value]"
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
                  <h1>{{ item.name }}の合計金額{{ total(item.value) }}円</h1>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
        <div v-else-if="item.value == 2">
          <!-- 収入入力ページ -->
        </div>
        <div v-else-if="item.value == 3">
          <!-- 固定費入力ページ -->
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="(moneyInfo, mIndex) in timeMoneys[item.value]"
                  :key="moneyInfo.name + mIndex"
                  cols="12"
                >
                  <other-number
                    :tab="tab"
                    @change-value="otherNumberSet(moneyInfo, $event)"
                  ></other-number>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
        <div v-else-if="item.value == 4">
          <!-- 集計ページ -->
          <v-row>
            <v-col
              v-for="totalItem in tabMenus"
              :key="totalItem.name"
              cols="12"
            >
              <h2>
                {{ totalItem.name }}
                <timely-money :moneys="timesCalc(totalItem.value)" />
              </h2>
            </v-col>
          </v-row>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import {
  createTabMenu,
  timeCount,
  getComma,
  timePattern,
  TimeLine,
  TabStatus,
} from '../components/Times'
import Number from '../components/Number.vue'
import OtherNumber from '../components/OtherNumber.vue'
import TimelyMoney from '../components/timelyMoney.vue'

export default {
  components: {
    Number,
    TimelyMoney,
    OtherNumber,
  },
  data() {
    const tabMenus = createTabMenu()
    const timeMoneys = {}
    tabMenus.forEach((item) => {
      timeMoneys[item.value] = []
      for (var i = 0; i < 10; i++) {
        timeMoneys[item.value].push(new TimeLine('', 1, 1, 0))
      }
    })
    return {
      tab: null,
      tabMenus,
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
        if (this.tab != TabStatus.All) {
          return null
        }
        const list = this.tabMenus
          .filter((item) => {
            return item.value == tab
          })
          .map((item) => {
            // TODO 固定費の考慮を入れないと動かない。2021/08/20
            return this.timeCalcList(this.calc(item.value), item.value)
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
        return getComma(Math.round(money * timeCount(time, item.day)))
      })
      return list
    },
    otherNumberSet(moneyInfo, $event) {
      moneyInfo.money = $event.money
      moneyInfo.day = $event.day
    },
  },
}
</script>
