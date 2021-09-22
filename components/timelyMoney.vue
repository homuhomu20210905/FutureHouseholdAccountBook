<template>
  <v-row>
    <v-col
      v-for="(item) in moneyList"
      :key="item.name"
      lg="3"
      sm="6"
      cols="12"
    >
      <v-card
        class="grey darken-3"
        outlined
      >
        <h2>
          <v-row>
            <v-col cols="5">
              {{ item.name }}
            </v-col>
            <v-spacer />
            <v-col
              cols="7"
              align="right"
            >
              {{ item.value }}円
            </v-col>
          </v-row>
        </h2>
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
