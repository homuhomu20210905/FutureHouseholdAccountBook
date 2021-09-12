<template>
  <v-row>
    <v-col
      v-for="(item) in moneyList"
      :key="item.name"
      cols="6"
      xs="6"
    >
      <v-card
        class="grey darken-3"
        outlined
      >
        <h2>{{ item.name }} {{ item.value }}円</h2>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Times from '../logic/Times'
const { timePattern } = Times
export default {
  props: {
    moneys: {
      type: Array,
      default: null,
    },
  },
  data () {
    return {}
  },
  computed: {
    moneyList () {
      if (!this.moneys) {
        return []
      }
      const list = this.moneys[0]
      return list.map((item, index) => {
        return {
          name: timePattern[index].name,
          value: item,
        }
      })
    },
  },
  methods: {},
}
</script>
