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
          @change="setMoney"
        />
      </v-col>
      <v-col
        cols="12"
        md="12"
        xs="12"
      >
        <v-text-field
          v-model="info.name"
          label="用途"
          solo
          outlined
          @input="setMoney"
        />
      </v-col>
      <v-col
        cols="12"
        md="12"
        xs="12"
      >
        <v-text-field
          v-model.number="info.value"
          label="お金"
          solo
          outlined
          suffix="円"
          @input="setMoney"
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
    validFlag: {
      type: Boolean,
      default: true
    },
    tab: {
      type: Number,
      default: 0
    }
  },
  data () {
    const info = {
      name: this.name,
      value: this.money,
      validFlag: this.validFlag
    }
    return {
      info,
      timePattern
    }
  },
  computed: {
    timeCalc () {
      const list = timePattern.map((item) => {
        return Math.round(this.info.value * timeCount(this.tab, item.day))
      })

      return list
    }
  },
  methods: {
    setMoney () {
      const info = this.info
      console.log('setMoney call...')
      console.log(info)
      this.$emit('change-value', info)
    }
  }
}
</script>
