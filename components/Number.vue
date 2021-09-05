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
            <total-money :name="time.name" :money="timeCalc[index]" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { timeCount, timePattern } from '../components/Times'
import totalMoney from './TotalMoney.vue'
export default {
  components: {
    totalMoney
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    money: {
      type: Number,
      default: 0
    },
    tab: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      useName: '',
      value: 0,
      timePattern
    }
  },
  computed: {
    timeCalc () {
      const list = timePattern.map((item) => {
        return Math.round(this.value * timeCount(this.tab, item.day))
      })

      return list
    }
  },
  methods: {
    setMoney () {
      console.log('set money called!!' + this.value)
      this.$emit('change-value', +this.value)
    }
  }
}
</script>
