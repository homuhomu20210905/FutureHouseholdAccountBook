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
          class="total-money"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TotalMoney from './TotalMoney.vue'
export default {
  name: 'TotalMonies',
  components: { TotalMoney },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    timePattern: {
      type: Array,
      require: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    timeCalc: {
      type: Array,
      require: true
    }
  }
}
</script>
