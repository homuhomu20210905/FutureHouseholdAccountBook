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
        <v-text-field
          v-model="info.cycle"
          label="周期"
          solo
          outlined
          @change="setTimeInfo"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="info.status"
          label="支出/収入"
          solo
          outlined
          @change="setTimeInfo"
        ></v-text-field>
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
    const info = new TimeLine('', 1, 1, 0)
    return {
      info,
      timePattern,
    }
  },
  computed: {
    timeCalc() {
      const list = timePattern.map((item) => {
        return getComma(Math.round(this.value * timeCount(this.tab, item.day)))
      })

      return list
    },
  },
  methods: {
    setTimeInfo() {
      this.$emit('change-value', this.info)
    },
  },
}
</script>
