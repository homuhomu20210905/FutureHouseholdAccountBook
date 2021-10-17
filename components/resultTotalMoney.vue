<template>
  <v-row>
    <v-col
      v-for="totalItem in tabMenus"
      :key="totalItem.name"
      cols="12"
    >
      <v-row v-if="totalItem.cycle.value != 9">
        <v-col
          cols="12"
        >
          <h2>
            {{ totalItem.name }}
          </h2>
        </v-col>
        <v-col>
          <timely-money
            :moneys="
              allSummaryOneDayMoney(totalItem.value)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Times from '../logic/Times'
import TimelyMoney from '../components/timelyMoney.vue'

export default {
  components: [TimelyMoney],
  props: {
    tabMenus: {
      type: Object,
      require: true,
      default: () => ({})
    },
    timeMoneys: {
      type: Object,
      require: true,
      default: () => ({})
    }
  },
  data () {
    return {}
  },
  computed: {
    // TAB毎の期間毎の合計を求め、配列として返す(概算計を返す)
    allSummaryOneDayMoney () {
      return (tab) => {
        if (tab == Times.TabStatus.All) {
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
    // TAB毎の1日単位の合計を求める
    tabSummaryOneDayMoney () {
      return (tab) => {
        let result = 0
        const names = []
        const list = this.timeMoneys[tab]
        if (!list) {
          return { result, names }
        }
        list.forEach((item) => {
          // TODO 名称に単価を入れる
          item.name && names.push(item.name + '(' + item.oneDayMoney() + '円)')
          result += item.oneDayMoney()
        })
        return { result, names }
      }
    },
    // 集計タブ用(ALL用)期間合計算出(概算計を返す)
    allOnlySummaryOneDayMoney () {
      const tabList = [
        Times.TabStatus.Work,
        Times.TabStatus.Holiday,
        Times.TabStatus.Income,
        Times.TabStatus.FixedCost,
      ]
      const allList = Array(Times.timePattern.length).fill(0)
      tabList.forEach((item) => {
        const list = this.allSummaryOneDayMoney(item).shift()
        list.forEach((item, index) => {
          allList[index] += +item
        })
      })
      return [allList]
    },
  },
  methods: {
    timeCalcList (money, tabStatus) {
      return Times.timePattern.map((item) => {
        return Math.round(money * Times.timeCount(tabStatus, item.day))
      })
    },
  }
}
</script>
