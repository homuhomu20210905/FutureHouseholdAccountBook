<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <v-row>
        <v-col cols="auto">
          <v-btn @click="menuView=!menuView">
            <v-icon
              large
            >
              mdi-menu
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="11">
          金額を入力してください。
        </v-col>
      </v-row>
    </v-card-title>

    <v-row>
      <v-slide-x-transition mode="out-in">
        <v-col
          v-if="menuView"
          cols="2"
        >
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
            vertical
          >
            <v-tab
              v-for="item in tabMenus"
              :key="item.name"
            >
              {{ item.name }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-slide-x-transition>
      <v-col
        cols="10"
      >
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in tabMenus"
            :key="item.name"
          >
            <div
              v-if="item.value == TabStatus.Work || item.value == TabStatus.Holiday"
            >
              <one-days
                :periods="timeMoneys[item.value]"
                :tab="tab"
                :item="item"
                @change-value2="
                  setNumber(item.value,
                            null,
                            $event)"
              />
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
                    md="12"
                    sm="12"
                  >
                    <other-number
                      :tab="tab"
                      :status="1"
                      :name="moneyInfo.name"
                      :value="moneyInfo.money"
                      :c-start="+moneyInfo.cycle.start"
                      :valid-flag="
                        moneyInfo.validFlag"
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
                        :name="moneyInfo.name"
                        :value="moneyInfo.money"
                        :c-start="+moneyInfo.cycle.start"
                        @change-value="otherNumberSet(item.value, mIndex, $event)"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>
            <div v-else-if="item.value == TabStatus.All">
              <!-- 集計ページ -->
              <result-total-money
                :key="allKey"
                :tab-menus.sync="tabMenus"
                :time-moneys.sync="timeMoneys"
              />
              <!-- <v-row>
                <v-col
                  v-for="totalItem in tabMenus"
                  :key="totalItem.name"
                  cols="12"
                >
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <h2 v-if="totalItem.cycle.value != 9">
                        {{ totalItem.name }}
                      </h2>
                    </v-col>
                  </v-row>
                  <timely-money
                    :moneys="allSummaryOneDayMoney(totalItem.value)"
                  />
                </v-col>
              </v-row> -->
            </div>
            <!-- カレンダー画面 -->
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
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Times from '../logic/Times'
import OtherNumber from '../components/OtherNumber.vue'
import daysjsja from '../components/daysjs-ja'
import oneDays from '../components/oneDays.vue'
import resultTotalMoney from '../components/resultTotalMoney.vue'
const { dayjs } = daysjsja
const {
  createTabMenu,
  timeCount,
  getComma,
  timePattern,
  TimeLine,
  TabStatus,
  CycleStatus,
} = Times
export default {
  components: {
    OtherNumber,
    oneDays,
    resultTotalMoney,
  },
  data () {
    const tabMenus = createTabMenu()
    const timeMoneys = {}
    tabMenus.forEach((item) => {
      timeMoneys[item.value] = []
      for (let i = 0; i < 3; i++) {
        timeMoneys[item.value].push(
          Object.assign({}, TimeLine('', Object.assign({}, item.cycle), 0))
        )
      }
    })
    return {
      currentDate: dayjs(new Date()),
      tab: null,
      tabMenus,
      timeMoneys,
      TabStatus,
      menuView: true,
      allKey: false
    }
  },
  computed: {
    // TAB毎の1日単位の合計を求める
    tabSummaryOneDayMoney () {
      return (tab) => {
        let result = 0
        const names = []
        this.timeMoneys[tab].forEach((item) => {
          // TODO 名称に単価を入れる
          item.name && names.push(item.name + '(' + item.oneDayMoney() + '円)')
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
    // TAB毎の期間毎の合計を求め、配列として返す(概算計を返す)
    allSummaryOneDayMoney () {
      return (tab) => {
        if (this.tabIndex != TabStatus.All) {
          return null
        } else if (tab == TabStatus.All) {
          return this.allOnlySummaryOneDayMoney
        }
        return this.tabMenus
          .filter((item) => {
            // tabinfoの値はTabStatus
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
    // 集計タブ用(ALL用)期間合計算出(概算計を返す)
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
      for (let i = 0; i < this.yearDays; i++) {
        const { result, names } = this.aggregationDateToSummaryMoney(date)
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
    endDate () {
      return dayjs(this.currentDate).add(1, 'year')
    },
    yearDays () {
      return +this.endDate.diff(this.currentDate, 'day')
    },
    // パラメータの日付によって、期間ごとの金額を返す
    // 日次〜年次までの必要な金額を加算して返す。(カレンダー用)
    aggregationDateToSummaryMoney () {
      /** 日によって金額を算出する */
      /** 週単位以降の金額は期間を元に算出する */
      const totalDay = +this.yearDays
      const work = this.tabSummaryOneDayMoney(TabStatus.Work)
      const holiday = this.tabSummaryOneDayMoney(TabStatus.Holiday)
      const objIncome = this.periodCalc(TabStatus.Income)
      const objFixedCost = this.periodCalc(TabStatus.FixedCost)

      const objGet = (key, objFixedCost, objIncome) => {
        let result = 0
        const list = [objFixedCost, objIncome]
        let names = []
        list.map(obj => obj.result[key]).filter(cost => cost).forEach(cost => {
          result += cost.money || 0
          names = names.concat(cost.names.filter(item => item.length != 0))
        })
        return { result, names }
      }

      /**
      * 集計
       */
      const calc = (day, pDate) => {
        const date = pDate.format('YYYY/MM/DD')
        let result = 0
        // 週単位
        const weekly = () => {
          const key = CycleStatus.Week.day + '-' + day
          return objGet(key, objFixedCost, objIncome)
        }
        // 月単位
        const month = (status) => {
          const endMonth = pDate.endOf('month').format('YYYY/MM/DD')
          const firstMonth = pDate.startOf('month').format('YYYY/MM/DD')
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
          return objGet(key, objFixedCost, objIncome)
        }

        const longPeriod = (periods, cycle) => {
          let result = 0
          let names = []
          if (
            periods.filter((item) => {
              return item == date
            }).length != 0
          ) {
            const key = cycle.day + '-' + 0
            const obj = objGet(key, objFixedCost, objIncome)
            result = obj.result
            names = obj.names
          }
          return { result, names }
        }

        // 半年
        const halfYear = () => {
          const halfYears = []
          for (
            let i = Math.floor(totalDay / 2);
            i < totalDay;
            i += Math.floor(totalDay / 2)
          ) {
            halfYears.push(
              dayjs(this.currentDate).add(i, 'day').format('YYYY/MM/DD')
            )
          }
          return longPeriod(halfYears, CycleStatus.HalfYear)
        }

        // １年
        const year = () => {
          const years = []
          years.push(this.endDate
            .add(-1, 'day')
            .format('YYYY/MM/DD')
          )
          return longPeriod(years, CycleStatus.Year)
        }

        // 結果取得
        const list = [weekly(),
          month(CycleStatus.Month),
          month(CycleStatus.TwoMonth),
          halfYear(),
          year()]

        const names = list.map(item => {
          const values = item.names.filter(val => { return val && val.length > 0 })
          return values.join(',')
        }).filter(item => { return item != '' })

        // 合計金額
        result = list.reduce((prev, cur) => {
          return cur.result + prev
        }, 0)

        return { result, names }
      }

      /**
      *   戻り値処理
       */
      return (baseDate) => {
        const calcDate = dayjs(baseDate)
        const day = +calcDate.day()
        let result = 0
        let names = []
        if (day == 0 || day == 6) {
          result = holiday.result
          names = names.concat(holiday.names)
        } else {
          result = work.result
          names = names.concat(work.names)
        }
        const obj = calc(day, calcDate)
        result += obj.result
        names = names.concat(obj.names)
        return { result, names }
      }
    },
  },
  watch: {
    tab: function (newValue) {
      // if (this.tabIndex === TabStatus.All) {
      //   this.allKey = !this.allKey
      // }
    }
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
      this.timeMoneys[status].forEach((item) => {
        const key = item.day + '-' + item.cycle.start
        if (!result[key]) {
          result[key] = {
            money: 0,
            names: []
          }
        }
        result[key].money += item.pay()
        // 名称に単価を入れる TODO
        item.name && result[key].names.push(item.name + '(' + item.pay() + '円)')
      })
      return { result }
    },
    total (value) {
      return getComma(this.tabSummaryOneDayMoney(value).result)
    },
    timeCalcList (money, tabStatus) {
      return timePattern.map((item) => {
        return Math.round(money * timeCount(tabStatus, item.day))
      })
    },
    otherNumberSet (value, index, $event) {
      // console.log('other-select...')
      // console.log($event.cycle.start)
      this.timeMoneys[value][index].name = $event.name
      this.timeMoneys[value][index].money = $event.money
      this.timeMoneys[value][index].day = $event.day
      this.timeMoneys[value][index].status = $event.status
      this.timeMoneys[value][index].cycle.value = $event.cycle.value
      this.timeMoneys[value][index].cycle.start = $event.cycle.start
      this.timeMoneys[value][index].validFlag = $event.validFlag
    },
    setNumber (value, index_, $event) {
      console.log('number value set...')
      console.log($event)
      const index = $event.$index
      this.timeMoneys[value][index].name = $event.name
      this.timeMoneys[value][index].money = $event.value
      this.timeMoneys[value][index].validFlag = $event.validFlag
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
