<template>
  <v-card class="grey darken-3" outlined>
    <v-row>
      <v-col v-for="(item, index) in moneyList" :key="index" cols="2">
        {{ item.name }} {{ item.value }}円
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { timePattern } from '../components/Times'
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
