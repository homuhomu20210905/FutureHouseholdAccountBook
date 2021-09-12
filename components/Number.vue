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
        <v-text-field
          v-model="useName"
          label="用途"
          solo
          outlined
          @blur="setMoney"
        />
      </v-col>
      <v-col
        cols="12"
        md="12"
        xs="12"
      >
        <v-text-field
          v-model.number="value"
          label="お金"
          solo
          outlined
          suffix="円"
          @bulr="setMoney"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="12"
        xs="12"
      >
        <v-row>
          <v-col
            v-for="(time, index) in timePattern"
            :key="time.name"
            cols="12"
            md="6"
            xs="6"
          >
            <total-money
              :name="time.name"
              :money="timeCalc[index]"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Times from '../logic/Times'
import totalMoney from './TotalMoney.vue'
const { timeCount, timePattern } = Times
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
      useName: this.name,
      value: this.money,
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
      const info = { value: +this.value, name: this.useName }
      console.log('setMoney call...')
      console.log(info)
      this.$emit('change-value', info)
    }
  }
}
</script>
