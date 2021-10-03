<template>
  <v-row>
    <v-col
      v-for="(time, index) in timePattern"
      :key="time.name"
      cols="12"
      md="6"
      xs="6"
    >
      <v-card>
        <total-money
          :name="time.name"
          :money="timeCalc[index]"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import totalMoney from './TotalMoney.vue'
export default {
  components: [totalMoney],
  props: {
    timePattern: {
      type: Object,
      require: true,
      default: () => ({ }) // Objectを生成する関数を指定する
    },
    timeCalc: {
      type: Object,
      require: true,
      default: () => ({ }) // Objectを生成する関数を指定する
    }
  }
}
</script>
