<template>
  <v-card
    class="grey darken-3"
    outlined
  >
    <v-row>
      <v-col cols="12">
        <v-select
          v-model="value"
          :items="periods"
          item-text="name"
          item-value="value"
          label="周期"
          solo
          outlined
          @change="setTimeInfo"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Times from '../assets/Times'
const { CycleStatus, } = Times
const weekdays = ['日', '月', '火', '水', '木', '金', '土'].map(
  (name, index) => {
    return { name, value: index }
  }
)
const months = ['1日', '月末'].map((name, index) => {
  return { name, value: index + 1 }
})
const twoMonths = ['奇数月', '偶数月'].map((name, index) => {
  return { name, value: index + 1 }
})
const dummy = [{ name: '', value: 1 }]

export default {
  props: {
    start: {
      type: Number,
      default: 0,
    },
    day: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      value: this.start,
    }
  },
  computed: {
    timeCalc () {
      const list = this.timePattern.map((item) => {
        return Math.ceil(this.info.oneDayMoney() * item.day)
      })

      return list
    },
    periods () {
      const list = CycleStatus.find('day', this.day)
      if (!list && list.length == 0) {
        return dummy
      }
      const value = list.shift().value
      if (value == CycleStatus.Week.value) {
        return weekdays
      } else if (value == CycleStatus.Month.value) {
        return months
      } else if (value == CycleStatus.TwoMonth.value) {
        return twoMonths
      }
      return dummy
    },
  },
  created () {
    if (this.periods.length > 0) {
      this.value = this.periods[0].value
    }
    this.setTimeInfo()
  },
  methods: {
    setTimeInfo () {
      if (this.periods.filter((item) => item.value == this.value).length == 0) {
        this.value = this.periods[0].value
      }
      console.log('peirod-select emit...' + this.value)
      this.$emit('period-select', this.value)
    },
  },
}
</script>
