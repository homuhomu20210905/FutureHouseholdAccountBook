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
          @change="setMoney"
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
      <v-col
        cols="12"
        md="12"
        xs="12"
      >
        <icon-select
          @select="info.iconSelect = $event.index"
        />
      </v-col>
      <v-col>
        {{ info.iconSelect }}
      </v-col>
    </v-row>
    <total-moneis
      :time-calc="timeCalc"
      :time-pattern="timePattern"
    />
  </v-card>
</template>

<script>
import Times from '../logic/Times'
import TotalMoneis from './TotalMonies.vue'
import iconSelect from './iconSelect.vue'
const { timeCount, timePattern } = Times
export default {
  components: {
    TotalMoneis,
    iconSelect
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
      validFlag: this.validFlag,
      iconSelect: 0
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
