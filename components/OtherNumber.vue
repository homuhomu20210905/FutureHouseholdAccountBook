<template>
  <v-card class="grey darken-3" outlined>
    <v-row>
      <v-col cols="3">
        <v-text-field
          v-model="info.name"
          label="用途"
          solo
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="info.money"
          label="お金"
          solo
          outlined
          suffix="円"
          @change="setTimeInfo"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="info.day"
          :items="timeList"
          item-text="name"
          item-value="day"
          label="周期"
          solo
          outlined
          @change="setTimeInfo"
        >
        </v-select>
      </v-col>
      <v-col cols="3">
        <period-select
          :day="info.day"
          :start="info.cycle.start"
          @period-select="changePeriod($event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col v-for="(time, index) in timePattern" :key="index" cols="2">
            <total-money :name="time.name" :money="timeCalc[index]" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { CycleStatus, timePattern, PayStatus } from './Times'

const OtherTime = (name, day, cycle, money, status) => {
  return {
    name,
    day,
    cycle,
    money,
    status: status != PayStatus.Income ? PayStatus.Spending : PayStatus.Income,
    oneDayMoney: function () {
      const money = this.pay()
      if (this.day == 1) {
        return money
      }
      return money / this.day
    },
    abs: function () {
      return Math.abs(this.oneDayMoney())
    },
    pay: function () {
      return PayStatus.Income == this.status ? this.money * -1 : this.money
    },
  }
}
import TotalMoney from '../components/TotalMoney.vue'
import PeriodSelect from '../components/PeriodSelect.vue'
export default {
  components: {
    TotalMoney,
    PeriodSelect,
  },
  props: {
    tab: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      info: new OtherTime('', 7, CycleStatus.Week, 0, this.status),
      timePattern,
    }
  },
  computed: {
    timeCalc() {
      const list = this.timePattern.map((item) => {
        return Math.ceil(this.info.oneDayMoney() * item.day)
      })

      return list
    },
    timeList() {
      return this.timePattern.filter((time) => {
        return time.day != 1
      })
    },
  },
  methods: {
    setTimeInfo() {
      console.log(JSON.stringify(this.info, null, 3))
      this.$emit('change-value', this.info)
    },
    changePeriod($event) {
      if ($event) {
        this.info.cycle.start = $event
      }
      this.setTimeInfo()
    },
  },
}
</script>
