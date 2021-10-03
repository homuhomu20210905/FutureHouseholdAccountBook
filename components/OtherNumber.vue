<template>
  <v-card
    class="grey darken-3"
    outlined
  >
    <v-row>
      <v-col
        cols="12"
        md="12"
        xs="12"
      >
        <v-switch
          v-model="info.validFlag"
          :label="info.validFlag ? '有効':'無効'"
          color="red"
          hide-details
          @change="changePeriod"
        />
      </v-col>
      <v-col
        lg="3"
        md="6"
        sm="12"
      >
        <v-text-field
          v-model="info.name"
          label="用途"
          @change="changePeriod"
        />
      </v-col>
      <v-col
        lg="3"
        md="6"
        sm="12"
      >
        <v-text-field
          v-model.number="info.money"
          label="お金"
          suffix="円"
          @change="setTimeInfo"
        />
      </v-col>
      <v-col
        lg="3"
        md="6"
        sm="12"
      >
        <v-select
          v-model="info.day"
          :items="timeList"
          item-text="name"
          item-value="day"
          label="周期"
          @change="setTimeInfo"
        />
      </v-col>
      <v-col
        lg="3"
        md="6"
        sm="12"
      >
        <period-select
          :day="info.day"
          :start="+info.cycle.start"
          @period-select="changePeriod($event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
        sm="12"
      >
        <total-moneis
          :time-calc="timeCalc"
          :time-pattern="timePattern"
        />

        <!-- <v-row>
          <v-col
            v-for="(time, index) in timePattern"
            :key="index"
            cols="12"
            md="6"
            sm="6"
          >
            <total-money
              :name="time.name"
              :money="timeCalc[index]"
            />
          </v-col>
        </v-row> -->
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TImes from '../logic/Times'
import totalMoneis from './TotalMonies.vue'
import PeriodSelect from '../components/PeriodSelect.vue'
const { CycleStatus, timePattern, TimeLine } = TImes
export default {
  components: {
    totalMoneis,
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
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    cStart: {
      type: Number,
      default: 0
    },
    validFlag: {
      type: Boolean,
      default: true
    },

  },
  data () {
    const cycle = Object.assign({}, CycleStatus.Week)
    cycle.start = this.cStart
    const info = Object.assign({}, TimeLine(this.name, Object.assign({}, cycle), this.value, this.status))
    info.validFlag = this.validFlag
    return {
      info: info,
      timePattern,
    }
  },
  computed: {
    timeCalc () {
      const list = this.timePattern.map((item) => {
        return Math.ceil(this.info.oneDayMoney() * item.day)
      })

      return list
    },
    timeList () {
      return this.timePattern.filter((time) => {
        return time.day != 1
      })
    },
  },
  methods: {
    setTimeInfo () {
      this.info.money = +this.info.money
      this.$emit('change-value', this.info)
    },
    changePeriod ($event) {
      this.info.cycle.start = $event
      // console.log('change period...' + $event)
      this.setTimeInfo()
    },
  },
}
</script>
