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
          <v-card-text>
            <v-row>
              <v-col
                v-for="(moneyInfo, mIndex) in timeMoneys[item.value]"
                :key="moneyInfo.name + mIndex"
                cols="12"
              >
                <other-number
                  :tab="tab"
                  :status="1"
                  @change-value="otherNumberSet(moneyInfo, $event)"
                ></other-number>
              </v-col>
            </v-row>
          </v-card-text>
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
                    :status="0"
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
              <h2 v-if="totalItem.cycle.value != 9">
                {{ totalItem.name }}
                <timely-money :moneys="timesCalc(totalItem.value)" />
              </h2>
            </v-col>
          </v-row>
        </div>
        <!-- カレンダー画面 -->
        <!-- TODO 集計データをここに渡せれば金額を入れ込むことができるはず。。。。 -->
        <div v-if="item.value == 5">
          <v-row>
            <v-col v-for="dt in dateList" :key="dt.view" cols="4">
              <h2>
                <span>{{ dt.view }}{{ dayCalc(dt.value) }} </span>
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
  CycleStatus,
} from '../components/Times'
import Number from '../components/Number.vue'
import OtherNumber from '../components/OtherNumber.vue'
import TimelyMoney from '../components/timelyMoney.vue'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
dayjs.locale(ja)
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
        timeMoneys[item.value].push(
          new TimeLine('', Object.assign(item.cycle), 0)
        )
      }
    })
    return {
      currentDate: dayjs(new Date()),
      tab: null,
      tabMenus,
      timeMoneys,
    }
  },
  computed: {
    calc() {
      //TAB毎の1日単位の合計を求める
      return (value) => {
        let result = 0
        this.timeMoneys[value].forEach((item) => {
          //result += item.money
          result += item.oneDayMoney()
        })
        return result
      }
    },
    timesCalc() {
      //TAB毎の期間毎の合計を求め、配列として返す
      return (tab) => {
        if (this.tab != TabStatus.All) {
          return null
        } else if (tab == TabStatus.All) {
          return this.allCalc
        }
        console.log('チェック')
        const list = this.tabMenus
          .filter((item) => {
            return item.value == tab
          })
          .map((item) => {
            // TODO 固定費の考慮を入れないと動かない。2021/08/20
            let money = this.calc(item.value)
            console.log('■' + money)
            return this.timeCalcList(money, item.value)
          })
        return list
      }
    },
    allCalc() {
      // 集計タブ用期間合計算出
      const all = this.timeMoneys[TabStatus.All]
      const tabList = [
        TabStatus.Work,
        TabStatus.Holiday,
        TabStatus.Income,
        TabStatus.FixedCost,
      ]
      const allList = Array(timePattern.length).fill(0)
      tabList.forEach((item) => {
        const list = this.timesCalc(item).shift()
        list.map((item, index) => {
          allList[index] += +item
        })
      })
      return [allList]
    },
    dateList() {
      let date = this.currentDate
      const list = []
      for (let i = 0; i < 365; i++) {
        list.push({
          view: dayjs(date).format('YYYY/MM/DD(dd)'),
          value: date,
        })
        date = dayjs(date).add(1, 'day')
      }
      return list
    },
    dayCalc() {
      /** 日によって金額を算出する */
      /** 週単位以降の金額は期間を元に算出する */
      let month = this.currentDate
      // const monthList = [...Array(12)].map((v, index) => {
      //   return dayjs(month).add(index, 'month')
      // })

      const work = this.calc(TabStatus.Work)
      const holiday = this.calc(TabStatus.Holiday)
      // this.periodCalc(TabStatus.FixedCost, (item) => {
      //   item.cycle.value === CycleStatus.Week.value
      // })

      return (baseDate) => {
        const day = +dayjs(baseDate).day()
        if (day == 0 || day == 6) {
          return work
        } else {
          return holiday
        }
      }
    },
    periodCalc() {
      //期間毎の集計
      return (value, callBack) => {
        let result = 0
        this.timeMoneys[value]
          .filter((item) => {
            return callBack(item)
          })
          .forEach((item) => {
            result += item.pay()
          })
        return result
      }
    },
  },
  methods: {
    total(value) {
      return getComma(this.calc(value))
    },
    timeCalcList(money, tabStatus) {
      //TODO 遅いと思われるので改善が必要。
      const list = timePattern.map((item) => {
        return Math.round(money * timeCount(tabStatus, item.day))
      })
      return list
    },
    otherNumberSet(moneyInfo, $event) {
      moneyInfo.money = $event.money
      moneyInfo.cycle.day = $event.day
    },
  },
}
</script>
