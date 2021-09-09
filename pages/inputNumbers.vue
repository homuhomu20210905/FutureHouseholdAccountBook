<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      金額を入力してください。
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in tabMenus"
        :key="item.name"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in tabMenus"
        :key="item.name"
      >
        <div
          v-if="item.value == TabStatus.Work || item.value == TabStatus.Holiday"
        >
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col
                  v-for="(moneyInfo, mIndex) in timeMoneys[item.value]"
                  :key="item.value + moneyInfo.name + mIndex"
                  cols="12"
                >
                  <number
                    :tab="tab"
                    @change-value="moneyInfo.money = $event"
                  />
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
        <div v-else-if="item.value == TabStatus.Income">
          <!-- 収入入力ページ -->
          <v-card-text>
            <v-row>
              <v-col
                v-for="(moneyInfo, mIndex) in timeMoneys[item.value]"
                :key="item.value + moneyInfo.name + mIndex"
                cols="12"
              >
                <other-number
                  :tab="tab"
                  :status="1"
                  @change-value="otherNumberSet(item.value, mIndex, $event)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </div>
        <div v-else-if="item.value == TabStatus.FixedCost">
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
                    @change-value="otherNumberSet(item.value, mIndex, $event)"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
        <div v-else-if="item.value == TabStatus.All">
          <!-- 集計ページ -->
          <v-row>
            <v-col
              v-for="totalItem in tabMenus"
              :key="totalItem.name"
              cols="12"
            >
              <h2 v-if="totalItem.cycle.value != 9">
                {{ totalItem.name }}
                <timely-money
                  :moneys="allSummaryOneDayMoney(totalItem.value)"
                />
              </h2>
            </v-col>
          </v-row>
        </div>
        <!-- カレンダー画面 -->
        <!-- TODO 集計データをここに渡せれば金額を入れ込むことができるはず。。。。 -->
        <div v-if="item.value == TabStatus.Calendar">
          <v-row>
            <v-col
              v-for="dt in dateList"
              :key="dt.view"
              cols="4"
            >
              <h2>
                {{ dt.view }}{{ dt.money }}{{ dt.names }}
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
import { dayjs } from '../components/daysjs-ja'
export default {
  components: {
    Number,
    TimelyMoney,
    OtherNumber,
  },
  data () {
    const tabMenus = createTabMenu()
    const timeMoneys = {}
    tabMenus.forEach((item) => {
      timeMoneys[item.value] = []
      for (let i = 0; i < 10; i++) {
        timeMoneys[item.value].push(
          new TimeLine('', Object.assign({}, item.cycle), 0)
        )
      }
    })
    return {
      currentDate: dayjs(new Date()),
      tab: null,
      tabMenus,
      timeMoneys,
      TabStatus,
    }
  },
  computed: {
    // TAB毎の1日単位の合計を求める
    tabSummaryOneDayMoney () {
      return (tab) => {
        let result = 0
        const names = []
        this.timeMoneys[tab].forEach((item) => {
          names.push(item.name)
          result += item.oneDayMoney()
        })
        return { result, names }
      }
    },
    tabIndex () {
      const list = []
      list.push(TabStatus.Work)
      list.push(TabStatus.Holiday)
      list.push(TabStatus.Income)
      list.push(TabStatus.FixedCost)
      list.push(TabStatus.All)
      list.push(TabStatus.Calendar)
      return list[this.tab]
    },
    // TAB毎の期間毎の合計を求め、配列として返す
    allSummaryOneDayMoney () {
      return (tab) => {
        if (this.tabIndex != TabStatus.All) {
          return null
        } else if (tab == TabStatus.All) {
          return this.allOnlySummaryOneDayMoney
        }
        return this.tabMenus
          .filter((item) => {
            return item.value == tab
          })
          .map((item) => {
            // TODO 固定費の考慮を入れないと動かない。2021/08/20
            const money = this.tabSummaryOneDayMoney(item.value).result
            console.log('■' + money)
            return this.timeCalcList(money, item.value)
          })
      }
    },
    // 集計タブ用期間合計算出
    allOnlySummaryOneDayMoney () {
      const tabList = [
        TabStatus.Work,
        TabStatus.Holiday,
        TabStatus.Income,
        TabStatus.FixedCost,
      ]
      const allList = Array(timePattern.length).fill(0)
      tabList.forEach((item) => {
        const list = this.allSummaryOneDayMoney(item).shift()
        list.forEach((item, index) => {
          allList[index] += +item
        })
      })
      return [allList]
    },
    // １年間の日付の配列を生成
    dateList () {
      let date = this.currentDate
      const list = []
      for (let i = 0; i < 365; i++) {
        const { result, names } = this.aggregationDateToSummaryMoney(date)
        console.log(result)
        list.push({
          view: dayjs(date).format('YYYY/MM/DD(dd)'),
          value: date,
          money: result,
          names
        })
        date = dayjs(date).add(1, 'day')
      }
      return list
    },
    // パラメータの日付によって、期間ごとの金額を返す
    // 日次〜年次までの必要な金額を加算して返す。(カレンダー用)
    aggregationDateToSummaryMoney () {
      /** 日によって金額を算出する */
      /** 週単位以降の金額は期間を元に算出する */
      const END_DATE = dayjs(this.currentDate).add(1, 'year')
      const totalDay = END_DATE.diff(this.currentDate, 'day')
      const halfYears = []
      for (
        let i = parseInt(totalDay / 2);
        i < totalDay;
        i += parseInt(totalDay / 2)
      ) {
        halfYears.push(
          dayjs(this.currentDate).add(i, 'day').format('YYYY/MM/DD')
        )
      }
      const years = []
      years.push(
        dayjs(this.currentDate)
          .add(1, 'year')
          .add(-1, 'day')
          .format('YYYY/MM/DD')
      )

      const work = this.tabSummaryOneDayMoney(TabStatus.Work)
      const holiday = this.tabSummaryOneDayMoney(TabStatus.Holiday)
      const objIncome = this.periodCalc(TabStatus.Income)
      const objFixedCost = this.periodCalc(TabStatus.FixedCost)

      const nameConcat = (fixed, income) => {
        let names = []
        if (fixed && fixed.names.length > 0) {
          names = names.concat(fixed.names)
        }
        if (income && income.names.length > 0) {
          names = names.concat(income.names)
        }
        return names
      }
      /**
      * 集計
       */
      const calc = (day, pDate) => {
        const date = pDate.format('YYYY/MM/DD')
        let result = 0
        // 週単位
        const weekly = () => {
          let result = 0
          const key = CycleStatus.Week.day + '-' + day
          result += objFixedCost.result[key] || 0
          result += objIncome.result[key] || 0
          const names = nameConcat(objFixedCost[key], objIncome[key])
          return { result, names }
        }
        // 月単位
        const month = (status) => {
          const endMonth = pDate.endOf('month').format('YYYY/MM/DD')
          const firstMonth = pDate.startOf('month').format('YYYY/MM/DD')
          let result = 0
          let data = null
          if (date == firstMonth) {
            data = 1
          } else if (date == endMonth) {
            data = 2
          }
          if (CycleStatus.TwoMonth.day == status.day && data == 1) {
            const m = +pDate.format('M')
            data = m % 2
          }
          const key = status.day + '-' + data
          result += objIncome.result[key] || 0
          result += objFixedCost.result[key] || 0

          const names = nameConcat(objFixedCost[key], objIncome[key])
          return { result, names }
        }
        // 半年
        const halfYear = () => {
          let result = 0
          let names = []
          if (
            halfYears.filter((item) => {
              return item == date
            }).length != 0
          ) {
            const key = CycleStatus.HalfYear.day + '-' + 1
            result += objIncome.result[key] || 0
            result += objFixedCost.result[key] || 0
            names = nameConcat(objFixedCost[key], objIncome[key])
          }
          return { result, names }
        }

        // １年
        const year = () => {
          let result = 0
          let names = []
          if (
            years.filter((item) => {
              return item == date
            }).length != 0
          ) {
            const key = CycleStatus.Year.day + '-' + 1
            result += objIncome.result[key] || 0
            result += objFixedCost.result[key] || 0
            names = nameConcat(objFixedCost[key], objIncome[key])
          }
          return { result, names }
        }

        // 結果取得
        const list = [weekly(),
          month(CycleStatus.Month),
          month(CycleStatus.TwoMonth),
          halfYear(),
          year()]

        const names = list.map(item => {
          return item.names.filter(val => { return val && val.length > 0 }).join(',')
        }).filter(item => { return item != '' }).join(',')
        //        result += list.reduce((p, r) => { return p + r.result }, 0)
        result = list.reduce((prev, cur) => {
          return cur.result + prev
        }, 0)
        // result += weekly()
        // result += month(CycleStatus.Month)
        // result += month(CycleStatus.TwoMonth)
        // result += halfYear()
        // result += year()

        return { result, names }
      }

      /**
      *   戻り値処理
       */
      return (baseDate) => {
        const day = +dayjs(baseDate).day()
        let result = 0
        if (day == 0 || day == 6) {
          result = holiday.result
        } else {
          result = work.result
        }
        const obj = calc(day, dayjs(baseDate))
        result += obj.result
        return { result, names: obj.names }
      }
    },
  },
  methods: {
    periodCalc (status) {
      /**
       * ここの処理の戻り値をオブジェクトにする。
       * 週次、月次、年次などの要素枚に金額をセットする。
       * 固定費又は収入の場合にこのメソッドを呼び出す。
       */

      // TAB毎の集計
      const result = {}
      const names = []
      this.timeMoneys[status].forEach((item) => {
        const key = item.day + '-' + item.cycle.start
        if (!result[key]) {
          result[key] = 0
        }
        result[key] += item.pay()
        names.push(item.name)
      })
      return { result, names }
    },
    total (value) {
      return getComma(this.tabSummaryOneDayMoney(value).result)
    },
    timeCalcList (money, tabStatus) {
      // TODO 遅いと思われるので改善が必要。
      const list = timePattern.map((item) => {
        return Math.round(money * timeCount(tabStatus, item.day))
      })
      return list
    },
    otherNumberSet (value, index, $event) {
      this.timeMoneys[value][index].money = $event.money
      this.timeMoneys[value][index].day = $event.day
      this.timeMoneys[value][index].cycle.value = $event.cycle.value
      this.timeMoneys[value][index].cycle.start = $event.cycle.start
    },
  },
}
</script>
