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
        <v-btn-toggle v-model="info.status" tile @change="setTimeInfo">
          <v-btn color="blue-grey" value="1" class="mr-5" v-text="'支出'" />
          <v-btn color="blue-grey" value="2" v-text="'収入'" />
        </v-btn-toggle>
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
          <v-col v-for="(time, index) in timePattern" :key="time.name" cols="2">
            <v-sheet rounded>
              日数：{{ time.name }}<BR /> 金額：{{ timeCalc[index] }}円
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { TimeLine, timeCount, getComma, timePattern } from './Times'
export default {
  props: {
    tab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    const info = new TimeLine('', 7, 1, 0)
    return {
      info,
      timePattern,
    }
  },
  computed: {
    timeCalc() {
      console.log('hoge' + this.info.oneDayMoney())
      const list = timePattern.map((item) => {
        return getComma(Math.ceil(this.info.oneDayMoney() * item.day))
      })

      return list
    },
    timeList() {
      return this.timePattern
        .filter((time) => {
          return time.day != 1
        })
        .map((time) => {
          return time
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
