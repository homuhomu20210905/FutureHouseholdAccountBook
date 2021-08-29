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

export default {
  components: {
    TotalMoney,
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
    const info = new OtherTime(
      '',
      CycleStatus.Week.day,
      CycleStatus.Week,
      0,
      this.status
    )
    return {
      info,
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
      this.$emit('change-value', this.info)
    },
  },
}
</script>
