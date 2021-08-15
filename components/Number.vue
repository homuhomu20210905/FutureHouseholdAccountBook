<template>
  <v-card class="grey darken-3" outlined>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="useName"
          label="用途"
          solo
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="value"
          label="お金"
          solo
          outlined
          suffix="円"
          @change="setMoney"
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
import { times, timeCount, getComma, timePattern } from '../components/Times'
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    money: {
      type: Number,
      default: 0,
    },
    tab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      useName: '',
      value: 0,
      timePattern,
    }
  },
  computed: {
    timeCalc() {
      const list = timePattern.map((item) => {
        return getComma(Math.round(this.value * timeCount(this.tab, item.time)))
      })

      return list
    },
  },
  methods: {
    setMoney() {
      console.log('set money called!!' + this.value)
      this.$emit('change-value', +this.value)
    },
  },
}
</script>
